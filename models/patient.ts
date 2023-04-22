import mongoose from 'mongoose';

import { EntryType } from './entry';

export type HealthRating = 1 | 2 | 3 | 4 | 5;

export type Gender = 'Male' | 'Female' | 'Other';

export interface PatientType {
  id: string;
  name: string;
  identificationNumber: string;
  occupation: string;
  gender: Gender;
  diagnosis: Array<string>;
  prescriptions: Array<string>;
  healthRating: HealthRating;
  entries: Array<EntryType>;
}

export type PatientWithDoctor = PatientType & {
  assignedDoctorId: string | undefined;
};

const patientSchema = new mongoose.Schema<PatientType>({
  name: {
    type: String,
    required: true
  },
  identificationNumber: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  diagnosis: [
    {
      type: String,
      unique: true
    }
  ],
  prescriptions: [
    {
      type: String,
      unique: true
    }
  ],
  healthRating: {
    type: Number,
    required: true
  },
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entry'
    }
  ]
});

patientSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Patient: mongoose.Model<PatientType> =
  mongoose.models.Patient || mongoose.model('Patient', patientSchema);
