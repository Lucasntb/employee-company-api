import { EmployeeRepository } from "../repositories/employee.repository";
import { CompanyRepository } from "../repositories/company.repository";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../validations/employee.schema";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";
import { EmployeeDoc } from "../models/employee.model";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export class EmployeeService {
  private employeeRepository: EmployeeRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.companyRepository = new CompanyRepository();
  }

  async create(data: CreateEmployeeDTO): Promise<EmployeeDoc> {
    if (!Types.ObjectId.isValid(data.companyId)) {
      throw new BadRequestError("companyId inválido");
    }

    const company = await this.companyRepository.findById(data.companyId);

    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    const existingEmail = await this.employeeRepository.findByEmailInCompany(
      data.email,
      data.companyId
    );

    if (existingEmail) {
      throw new ConflictError("Já existe um funcionário com este email nesta empresa");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const payload = {
      ...data,
      password: hashedPassword,
    };

    return this.employeeRepository.create(payload);
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("ID inválido");
    }

    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundError("Funcionário não encontrado");
    }

    return employee;
  }

  async findByCompany(companyId: string) {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new BadRequestError("companyId inválido");
    }

    return this.employeeRepository.findByCompany(companyId);
  }

  async update(id: string, data: UpdateEmployeeDTO) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("ID inválido");
    }

    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundError("Funcionário não encontrado");
    }

    if (data.email) {
      const duplicated = await this.employeeRepository.findByEmailInCompany(
        data.email,
        employee.companyId.toString()
      );

      if (duplicated && duplicated._id.toString() !== id) {
        throw new ConflictError("Já existe um funcionário com este email nesta empresa");
      }
    }

    let payload: any = { ...data };

    if (data.password) {
      payload.password = await bcrypt.hash(data.password, 10);
    }

    return this.employeeRepository.update(id, payload);
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("ID inválido");
    }

    const employee = await this.employeeRepository.delete(id);

    if (!employee) {
      throw new NotFoundError("Funcionário não encontrado");
    }

    return employee;
  }
}