import EmployeeModel, { EmployeeDoc, EmployeeAttrs } from "../models/employee.model";
import { UpdateEmployeeDTO } from "../validations/employee.schema";

export class EmployeeRepository {
  async create(data: EmployeeAttrs): Promise<EmployeeDoc> {
    return EmployeeModel.create(data);
  }

  async findByCompany(companyId: string): Promise<EmployeeDoc[]> {
    return EmployeeModel.find({ companyId }).exec();
  }

  async findById(id: string): Promise<EmployeeDoc | null> {
    return EmployeeModel.findById(id).exec();
  }

  async findByEmailInCompany(email: string, companyId: string): Promise<EmployeeDoc | null> {
    return EmployeeModel.findOne({ email, companyId }).exec();
  }

  async update(id: string, data: UpdateEmployeeDTO): Promise<EmployeeDoc | null> {
    return EmployeeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<EmployeeDoc | null> {
    return EmployeeModel.findByIdAndDelete(id).exec();
  }
}
