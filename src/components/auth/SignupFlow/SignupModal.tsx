import React from 'react';
import { SignupProvider } from './SignupContext';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { useSignup } from './SignupContext';

const SignupSteps = () => {
  const { step } = useSignup();

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Company Details'}
            {step === 3 && 'Create Password'}
          </h2>
        </div>
      </div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </>
  );
};

export const SignupModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <SignupProvider>
          <SignupSteps />
        </SignupProvider>
      </div>
    </div>
  );
};