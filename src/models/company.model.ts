import { Schema, model, Document } from 'mongoose';

export interface CompanyAttrs {
  name: string;
  sector?: string;
  cnpj: string;
  city?: string;
  phone?: string;
  status: string;
}

export interface CompanyDoc extends Document {
  name: string;
  sector?: string;
  cnpj: string;
  city?: string;
  phone?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<CompanyDoc>({
  name: { type: String, required: true, trim: true },
  sector: { type: String, trim: true },
  cnpj: { type: String, required: true, trim: true },
  city: { type: String, trim: true },
  phone: { type: String, trim: true },
  status: { type: String, required: true, default: "ativo" },
}, {
  timestamps: true,
  versionKey: false,
});

CompanySchema.index({ cnpj: 1 }, { unique: true });

export const CompanyModel = model<CompanyDoc>('Company', CompanySchema);
export default CompanyModel;
