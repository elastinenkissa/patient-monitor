interface CompanyContactInfo {
  email: string;
  address: string;
}

export interface HealthcareCompany {
  id: string;
  name: string;
  contact?: CompanyContactInfo;
}
