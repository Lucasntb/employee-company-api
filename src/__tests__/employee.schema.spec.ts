import { createEmployeeSchema, updateEmployeeSchema } from "../validations/employee.schema";

describe("Employee Schema Validation", () => {
  describe("createEmployeeSchema", () => {
    it("should accept valid data", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        role: "Developer",
        password: "pass1234",
        companyId: "507f1f77bcf86cd799439011",
      };

      const result = createEmployeeSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john@example.com");
      }
    });

    it("should reject invalid email", () => {
      const invalidData = {
        name: "John",
        email: "invalid-email",
        role: "Dev",
        password: "1234",
        companyId: "507f1f77bcf86cd799439011",
      };

      const result = createEmployeeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject short password (less than 4 chars)", () => {
      const invalidData = {
        name: "John",
        email: "john@example.com",
        role: "Dev",
        password: "123",
        companyId: "507f1f77bcf86cd799439011",
      };

      const result = createEmployeeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const invalidData = {
        name: "",
        email: "john@example.com",
        role: "Dev",
        password: "1234",
        companyId: "507f1f77bcf86cd799439011",
      };

      const result = createEmployeeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject empty role", () => {
      const invalidData = {
        name: "John",
        email: "john@example.com",
        role: "",
        password: "1234",
        companyId: "507f1f77bcf86cd799439011",
      };

      const result = createEmployeeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should accept optional status", () => {
      const validData = {
        name: "John",
        email: "john@example.com",
        role: "Dev",
        password: "1234",
        companyId: "507f1f77bcf86cd799439011",
        status: "inativo" as const,
      };

      const result = createEmployeeSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("updateEmployeeSchema", () => {
    it("should accept partial update", () => {
      const validData = {
        name: "John Updated",
        email: "john.new@example.com",
      };

      const result = updateEmployeeSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email on update", () => {
      const invalidData = {
        email: "invalid-email",
      };

      const result = updateEmployeeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
