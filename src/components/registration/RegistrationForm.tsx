import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyInfoForm } from './CompanyInfoForm';
import { AddressForm } from './AddressForm';
import { ContactPersonForm } from './ContactPersonForm';
import { submitRegistrationRequest } from '../../services/registrationService';
import type { RegistrationFormData } from '../../types/registration';

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    companyName: '',
    ico: '',
    dic: '',
    address: {
      street: '',
      city: '',
      zip: '',
      country: 'Česká republika'
    },
    contactPerson: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await submitRegistrationRequest(formData);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Failed to submit registration request');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">
            Žádost o registraci byla úspěšně odeslána
          </h2>
          <p className="text-green-700 mb-4">
            Děkujeme za Váš zájem. Vaši žádost zpracujeme co nejdříve.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Zpět na hlavní stránku
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <CompanyInfoForm
        formData={formData}
        setFormData={setFormData}
      />
      <AddressForm
        formData={formData}
        setFormData={setFormData}
      />
      <ContactPersonForm
        formData={formData}
        setFormData={setFormData}
      />

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {submitting ? 'Odesílám...' : 'Odeslat žádost'}
        </button>
      </div>
    </form>
  );
};