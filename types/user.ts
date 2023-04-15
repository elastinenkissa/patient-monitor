import { HealthcareCompany } from './general';

export interface User {
  id: string;
  name: string;
  identificationNumber: string;
  company: HealthcareCompany;
  imageUrl: string;
  isAdministrator: boolean;
}
