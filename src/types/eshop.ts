export type IntegrationType = 'api' | 'modal' | 'sdk';
export type ContractType = 'fixed' | 'flexible';
export type Sector = 'pyrotechnics' | 'weapons' | 'tobacco' | 'other';

export interface BrandingConfig {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  texts: {
    intro: string;
    approved: string;
    rejected: string;
  };
}

export interface VerificationMethods {
  bankId: boolean;
  mojeId: boolean;
  idCard: boolean;
  passport: boolean;
}

export interface EshopRegistration {
  name: string;
  url: string;
  sector: Sector;
  integrationType: IntegrationType;
  apiKey?: string;
  branding?: BrandingConfig;
  verificationMethods: VerificationMethods;
  contractType: ContractType;
  userId: string;
  createdAt: Date;
  status: 'active' | 'pending' | 'disabled';
}

export interface EshopFormData extends Omit<EshopRegistration, 'apiKey' | 'userId' | 'createdAt' | 'status'> {}
