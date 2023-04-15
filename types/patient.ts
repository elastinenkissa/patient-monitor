import { HealthcareCompany } from './general';

export interface Diagnosis {
  name: string;
  latinName: string;
  code: string;
}

type HealthRating = 1 | 2 | 3 | 4 | 5;

interface Entry {
  date: Date;
  diagnosis?: Array<Diagnosis>;
  content: string;
}

export interface Patient {
  id: string;
  name: string;
  identificationNumber: string;
  occupation: string;
  sex: 'Male' | 'Female' | 'Intersex';
  diagnosis?: Array<Diagnosis>;
  healthcareCompany: HealthcareCompany;
  healthRating: HealthRating;
  entries?: Array<Entry>;
}
