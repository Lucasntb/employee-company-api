import { CompanyRepository } from "../repositories/company.repository";
import { CreateCompanyDTO, UpdateCompanyDTO } from "../validations/company.schema";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";
import { CompanyDoc } from "../models/company.model";
import { Types } from "mongoose";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async create(data: CreateCompanyDTO): Promise<CompanyDoc> {
    const existing = await this.companyRepository.findByCnpj(data.cnpj);
    if (existing) {
      throw new ConflictError("Já existe uma empresa com este CNPJ");
    }

    return this.companyRepository.create(data);
  }

  async findAll() {
    return this.companyRepository.findAll();
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("ID inválido");
    }

    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    return company;
  }

  async update(id: string, data: UpdateCompanyDTO) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("ID inválido");
    }

    const company = await this.companyRepository.update(id, data);

    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    return company;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("ID inválido");
    }

    const company = await this.companyRepository.delete(id);

    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    return company;
  }
}