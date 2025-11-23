import { Request, Response, NextFunction } from "express";
import { EmployeeService } from "../services/employee.service";
import { createEmployeeSchema, updateEmployeeSchema } from "../validations/employee.schema";

export class EmployeeController {
  private employeeService = new EmployeeService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createEmployeeSchema.parse(req.body);
      const employee = await this.employeeService.create(data);

      return res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await this.employeeService.findById(req.params.id);
      return res.json(employee);
    } catch (err) {
      next(err);
    }
  }

  listByCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await this.employeeService.findByCompany(req.params.companyId);
      return res.json(employees);
    } catch (err) {
      next(err);
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = updateEmployeeSchema.parse(req.body);
      const employee = await this.employeeService.update(req.params.id, data);

      return res.json(employee);
    } catch (err) {
      next(err);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.employeeService.delete(req.params.id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
