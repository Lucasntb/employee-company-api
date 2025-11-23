import { Router } from "express";
import { CompanyController } from "../controllers/company.controller";

const router = Router();
const controller = new CompanyController();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
