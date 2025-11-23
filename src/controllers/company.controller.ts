import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../services/company.service";
import { createCompanySchema, updateCompanySchema } from "../validations/company.schema";

export class CompanyController {
  private companyService = new CompanyService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createCompanySchema.parse(req.body);
      const company = await this.companyService.create(data);

      return res.status(201).json(company);
    } catch (err) {
      next(err);
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await this.companyService.findAll();
      return res.json(companies);
    } catch (err) {
      next(err);
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const company = await this.companyService.findById(req.params.id);
      return res.json(company);
    } catch (err) {
      next(err);
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = updateCompanySchema.parse(req.body);
      const company = await this.companyService.update(req.params.id, data);

      return res.json(company);
    } catch (err) {
      next(err);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.companyService.delete(req.params.id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
