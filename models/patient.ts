import mongoose from 'mongoose';

import { UserType } from './user';

export type HealthRating = 1 | 2 | 3 | 4 | 5;

type Doctor = Omit<
  UserType,
  'identificationNumber' | 'company' | 'imageUrl' | 'isAdministrator'
>;

type Diagnosis = Array<string>;
type Prescriptions = Array<string>;

export class Entry {
  date: Date;

  constructor(
    public by: Doctor,
    public content: string,
    public addedDiagnosis: Diagnosis,
    public removingDiagnosis: Diagnosis,
    public addedPrescriptions: Prescriptions,
    public removingPrescriptions: Prescriptions,
    public newHealthRating: HealthRating
  ) {
    this.date = new Date();
  }
}

export type Gender = 'Male' | 'Female' | 'Other';

export interface PatientType {
  id: string;
  name: string;
  identificationNumber: string;
  occupation: string;
  gender: Gender;
  diagnosis: Diagnosis;
  prescriptions: Prescriptions;
  healthRating: HealthRating;
  entries: Array<Entry>;
}

const patientSchema = new mongoose.Schema<PatientType>({
  name: {
    type: String,
    required: true
  },
  identificationNumber: {
    type: String,
    required: true,
    unique: true
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
      type: String
    }
  ],
  prescriptions: [
    {
      type: String
    }
  ],
  healthRating: {
    type: Number,
    required: true
  }
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
