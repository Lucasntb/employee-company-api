import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
const controller = new EmployeeController();

router.post("/", controller.create);
router.get("/company/:companyId", controller.listByCompany);
router.get("/:id", controller.getById);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;