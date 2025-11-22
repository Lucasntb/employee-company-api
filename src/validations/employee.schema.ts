import { z } from 'zod';

export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Nome do funcionário é obrigatório"),
  email: z.string().email("Email inválido"),
  role: z.string().min(1, "Cargo é obrigatório"),
  password: z.string().min(4, "Senha deve ter pelo menos 4 caracteres"),
  status: z.enum(["ativo", "inativo"]).optional(),
  terminationDate: z.coerce.date().optional().nullable(),
  companyId: z.string().min(1, "companyId é obrigatório"),
});

export const updateEmployeeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
  password: z.string().min(4).optional(),
  status: z.enum(["ativo", "inativo"]).optional(),
  terminationDate: z.coerce.date().optional().nullable(),
});

export type CreateEmployeeDTO = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDTO = z.infer<typeof updateEmployeeSchema>;
