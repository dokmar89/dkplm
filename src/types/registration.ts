export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface ContactPerson {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CompanyData {
  companyId: string;
  companyName: string;
  ico: string;
  dic: string;
  address: Address;
  contactPerson: ContactPerson;
  userId: string;
  walletBalance: number;
  contractType: 'standard' | 'longTerm';
  contractStartDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrationRequest {
  companyName: string;
  ico: string;
  dic: string;
  address: Address;
  contactPerson: ContactPerson;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  userId: string;
  companyId?: string;
}

export interface RegistrationFormData {
  companyName: string;
  ico: string;
  dic: string;
  address: Address;
  contactPerson: ContactPerson;
}

export interface RegistrationResponse {
  success: boolean;
  companyId: string;
  error?: string;
}