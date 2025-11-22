import CompanyModel, { CompanyDoc, CompanyAttrs } from "../models/company.model";
import { UpdateCompanyDTO } from "../validations/company.schema";

export class CompanyRepository {
  async create(data: CompanyAttrs): Promise<CompanyDoc> {
    return CompanyModel.create(data);
  }

  async findAll(): Promise<CompanyDoc[]> {
    return CompanyModel.find().exec();
  }

  async findById(id: string): Promise<CompanyDoc | null> {
    return CompanyModel.findById(id).exec();
  }

  async findByCnpj(cnpj: string): Promise<CompanyDoc | null> {
    return CompanyModel.findOne({ cnpj }).exec();
  }

async update(id: string, data: UpdateCompanyDTO): Promise<CompanyDoc | null> {
  return CompanyModel.findByIdAndUpdate(id, data, { new: true }).exec();
}

  async delete(id: string): Promise<CompanyDoc | null> {
    return CompanyModel.findByIdAndDelete(id).exec();
  }
}
