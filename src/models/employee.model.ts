import { Schema, model, Document, Types } from 'mongoose';

export interface EmployeeAttrs {
  name: string;
  email: string;
  role: string;
  password: string;
  status?: 'ativo' | 'inativo' | string;
  terminationDate?: Date | null;
  companyId: Types.ObjectId | string;
}

export interface EmployeeDoc extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
  status: string;
  terminationDate?: Date | null;
  companyId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<EmployeeDoc>({
  name: { type: String, required: true, trim: true },

  email: { type: String, required: true, trim: true, lowercase: true },

  role: { type: String, required: true, trim: true },

  password: { type: String, required: true },

  status: { type: String, default: 'ativo' },

  terminationDate: { type: Date, default: null },

  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
}, {
  timestamps: true,
  versionKey: false,
});

EmployeeSchema.set("toJSON", {
  transform: (doc, ret: any) => {
    delete ret.password;
    return ret;
  },
});

EmployeeSchema.index({ companyId: 1, email: 1 }, { unique: true });

export const EmployeeModel = model<EmployeeDoc>('Employee', EmployeeSchema);
export default EmployeeModel;
