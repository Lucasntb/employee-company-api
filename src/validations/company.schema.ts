import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1, "Nome da empresa é obrigatório"),
  sector: z.string().optional(),
  cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter 14 dígitos numéricos"),
  city: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["ativo", "inativo"]).default("ativo"),
});

export const updateCompanySchema = z.object({
  name: z.string().optional(),
  sector: z.string().optional(),
  cnpj: z.string().regex(/^\d{14}$/).optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["ativo", "inativo"]).optional(),
});

export type CreateCompanyDTO = z.infer<typeof createCompanySchema>;
export type UpdateCompanyDTO = z.infer<typeof updateCompanySchema>;
