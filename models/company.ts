import mongoose from 'mongoose';

import { PatientType } from './patient';

export interface HealthcareCompany {
  id: string;
  name: string;
  patients: Array<PatientType>;
}

const companySchema = new mongoose.Schema<HealthcareCompany>({
  name: {
    type: String,
    required: true
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      unique: true
    }
  ]
});

companySchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Company: mongoose.Model<HealthcareCompany> =
  mongoose.models.Company || mongoose.model('Company', companySchema);
