import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger/swagger.config";
import companyRoutes from "./routes/company.routes";
import employeeRoutes from "./routes/employee.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/companies", companyRoutes);
app.use("/employees", employeeRoutes);

app.use(errorHandler);

export default app;