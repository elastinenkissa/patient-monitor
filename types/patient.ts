import { HealthcareCompany } from './general';
import { User } from './user';

export type HealthRating = 1 | 2 | 3 | 4 | 5;

type Doctor = Omit<
  User,
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

export interface Patient {
  id: string;
  name: string;
  identificationNumber: string;
  occupation: string;
  sex: Gender;
  diagnosis: Diagnosis;
  prescriptions: Prescriptions;
  healthcareCompany: HealthcareCompany;
  healthRating: HealthRating;
  entries: Array<Entry>;
}
