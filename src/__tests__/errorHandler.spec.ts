import { errorHandler } from "../middlewares/errorHandler";
import { AppError, NotFoundError, ConflictError, BadRequestError } from "../utils/errors";
import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

describe("Error Handler Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should handle NotFoundError with status 404", () => {
    const error = new NotFoundError("Company not found");

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Company not found",
    });
  });

  it("should handle ConflictError with status 409", () => {
    const error = new ConflictError("CNPJ already registered");

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "CNPJ already registered",
    });
  });

  it("should handle BadRequestError with status 400", () => {
    const error = new BadRequestError("Invalid ID");

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Invalid ID",
    });
  });

  it("should handle ZodError with status 400 and include error details", () => {
    const schema = z.object({
      name: z.string(),
      cnpj: z.string().min(14),
    });

    let zodError: ZodError | null = null;

    try {
      schema.parse({
        name: 123,
        cnpj: "123",
      });
    } catch (error) {
      zodError = error as ZodError;
    }

    errorHandler(zodError!, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();

    const jsonCall = (mockRes.json as jest.Mock).mock.calls[0][0];
    expect(jsonCall.message).toBe("Validation error");
    expect(jsonCall.errors).toHaveLength(2);
    expect(jsonCall.errors[0].field).toBe("name");
    expect(jsonCall.errors[1].field).toBe("cnpj");
  });

  it("should handle generic errors with 500", () => {
    const error = new Error("Unexpected system error");

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });

  it("should handle generic AppError with custom status", () => {
    const error = new AppError("Custom error", 418);

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(418);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Custom error",
    });
  });
});
