import express from "express";
import companyRoutes from "./routes/company.routes";
import employeeRoutes from "./routes/employee.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => res.json({ STATUS: "OK" }));

app.use("/companies", companyRoutes);
app.use("/employees", employeeRoutes);

app.use(errorHandler);

export default app;
