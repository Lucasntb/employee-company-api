import { createCompanySchema, updateCompanySchema } from "../validations/company.schema";

describe("Company Schema Validation", () => {
  describe("createCompanySchema", () => {
    it("should accept valid data", () => {
      const validData = {
        name: "ACME LTDA",
        cnpj: "12345678901234",
        sector: "Technology",
        city: "São Paulo",
        phone: "11999999999",
        status: "ativo" as const,
      };

      const result = createCompanySchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("ACME LTDA");
        expect(result.data.cnpj).toBe("12345678901234");
      }
    });

    it("should reject CNPJ with less than 14 digits", () => {
      const invalidData = {
        name: "ACME",
        cnpj: "123456789",
        status: "ativo" as const,
      };

      const result = createCompanySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject CNPJ containing letters", () => {
      const invalidData = {
        name: "ACME",
        cnpj: "1234567890123A",
        status: "ativo" as const,
      };

      const result = createCompanySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const invalidData = {
        name: "",
        cnpj: "12345678901234",
        status: "ativo" as const,
      };

      const result = createCompanySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should accept status 'inativo'", () => {
      const validData = {
        name: "ACME",
        cnpj: "12345678901234",
        status: "inativo" as const,
      };

      const result = createCompanySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("updateCompanySchema", () => {
    it("should accept partial update", () => {
      const validData = {
        name: "ACME Updated",
      };

      const result = updateCompanySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept empty object", () => {
      const result = updateCompanySchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});
