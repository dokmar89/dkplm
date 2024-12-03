import React, { createContext, useContext, useState } from 'react';

interface SignupData {
  // Step 1
  name: string;
  surname: string;
  phone: string;
  email: string;
  // Step 2
  company: string;
  ico: string;
  address: string;
  website: string;
  // Step 3
  password: string;
  acceptTerms: boolean;
}

interface SignupContextType {
  data: SignupData;
  updateData: (newData: Partial<SignupData>) => void;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

const initialData: SignupData = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  company: '',
  ico: '',
  address: '',
  website: '',
  password: '',
  acceptTerms: false,
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SignupData>(initialData);
  const [step, setStep] = useState(1);

  const updateData = (newData: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <SignupContext.Provider value={{ data, updateData, step, nextStep, prevStep }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};