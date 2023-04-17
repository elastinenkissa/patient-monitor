import { HealthcareCompany } from './general';
import { User } from './user';

export type HealthRating = 1 | 2 | 3 | 4 | 5;

type Doctor = Omit<
  User,
  'identificationNumber' | 'company' | 'imageUrl' | 'isAdministrator'
>;

type Diagnosis = Array<string>;
type Prescriptions = Array<string>;

export interface Entry {
  date: string;
  addedDiagnosis: Diagnosis;
  removingDiagnosis: Diagnosis;
  addedPrescriptions: Prescriptions;
  removingPrescriptions: Prescriptions;
  content: string;
  by: Doctor;
  newHealthRating: HealthRating;
}

export interface Patient {
  id: string;
  name: string;
  identificationNumber: string;
  occupation: string;
  sex: 'Male' | 'Female' | 'Intersex';
  diagnosis: Diagnosis;
  prescriptions: Prescriptions;
  healthcareCompany: HealthcareCompany;
  healthRating: HealthRating;
  entries: Array<Entry>;
}
