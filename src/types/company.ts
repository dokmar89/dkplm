export interface Company {
  companyId: string;
  companyName: string;
  dic: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  userId: string;
  walletBalance: number;
  contractType: 'standard' | 'longTerm';
  contractStartDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Eshop {
  eshopId: string;
  companyId: string;
  shopName: string;
  websiteUrl: string;
  sector: 'pyrotechnics' | 'firearms' | 'tobacco' | 'alcohol' | 'adultContent' | 'chemicals' | 'others';
  integrationMethod: 'api' | 'modal' | 'sdk';
  apiKey: string;
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  };
  texts: {
    introText: string;
    successText: string;
    failureText: string;
  };
  allowedMethods: string[];
  contractType: string;
  contractStartDate: Date;
  createdAt: Date;
  updatedAt: Date;
}