import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyInfoForm } from './CompanyInfoForm';
import { AddressForm } from './AddressForm';
import { ContactPersonForm } from './ContactPersonForm';
import { Button } from '../ui/Button';
import type { RegistrationFormData } from '../../types/registration';
import { submitRegistrationRequest } from '../../services/registrationService';

const initialFormData: RegistrationFormData = {
  companyName: '',
  ico: '',
  dic: '',
  address: {
    street: '',
    city: '',
    zip: '',
    country: ''
  },
  contactPerson: {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }
};

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitRegistrationRequest(formData);
      navigate('/registration-success');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Registrace společnosti</h1>
        <p className="text-gray-600 mt-2">
          Vyplňte prosím následující údaje pro registraci vaší společnosti
        </p>
      </div>

      <CompanyInfoForm
        companyName={formData.companyName}
        ico={formData.ico}
        dic={formData.dic}
        onCompanyNameChange={(value) => setFormData({ ...formData, companyName: value })}
        onIcoChange={(value) => setFormData({ ...formData, ico: value })}
        onDicChange={(value) => setFormData({ ...formData, dic: value })}
      />

      <AddressForm
        address={formData.address}
        onChange={(address) => setFormData({ ...formData, address })}
      />

      <ContactPersonForm
        contactPerson={formData.contactPerson}
        onChange={(contactPerson) => setFormData({ ...formData, contactPerson })}
      />

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/')}
        >
          Zrušit
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Odesílání...' : 'Odeslat registraci'}
        </Button>
      </div>
    </form>
  );
};