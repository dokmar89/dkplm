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

export interface RegistrationRequest {
  companyName: string;
  ico: string;
  dic: string;
  address: Address;
  contactPerson: ContactPerson;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface RegistrationFormData {
  companyName: string;
  ico: string;
  dic: string;
  address: Address;
  contactPerson: ContactPerson;
}