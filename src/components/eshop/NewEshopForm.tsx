import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import type { EshopFormData, IntegrationType, Sector, ContractType } from '../../types/eshop';

const SECTORS: { value: Sector; label: string }[] = [
  { value: 'pyrotechnics', label: 'Pyrotechnika' },
  { value: 'weapons', label: 'Zbraně' },
  { value: 'tobacco', label: 'Kuřivo' },
  { value: 'other', label: 'Ostatní' }
];

const INTEGRATION_TYPES: { value: IntegrationType; label: string; description: string }[] = [
  { 
    value: 'api', 
    label: 'API Integrace',
    description: 'Vlastní implementace pomocí našeho API. Získáte API klíč, endpointy a dokumentaci.'
  },
  { 
    value: 'modal', 
    label: 'Modální okno',
    description: 'Přizpůsobitelné modální okno pro ověření. Jednoduchá integrace pomocí JavaScriptu.'
  },
  { 
    value: 'sdk', 
    label: 'SDK/Plugin',
    description: 'Hotové řešení pro vybrané e-commerce platformy.'
  }
];

const CONTRACT_TYPES: { value: ContractType; label: string; description: string }[] = [
  {
    value: 'fixed',
    label: 'Smlouva na 2 roky',
    description: 'Zvýhodněné ceny za ověření s dlouhodobým závazkem.'
  },
  {
    value: 'flexible',
    label: 'Bez smlouvy',
    description: 'Standardní ceny bez závazku.'
  }
];

export const NewEshopForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EshopFormData>({
    name: '',
    url: '',
    sector: 'other',
    integrationType: 'modal',
    branding: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      texts: {
        intro: 'Prosím ověřte svůj věk',
        approved: 'Ověření proběhlo úspěšně',
        rejected: 'Ověření se nezdařilo'
      }
    },
    verificationMethods: {
      bankId: true,
      mojeId: true,
      idCard: true,
      passport: true
    },
    contractType: 'fixed'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to backend
    navigate('/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Název e-shopu
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL adresa e-shopu
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sektor
        </label>
        <select
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value as Sector })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          {SECTORS.map((sector) => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Další krok
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Způsob integrace
        </label>
        <div className="mt-2 space-y-4">
          {INTEGRATION_TYPES.map((type) => (
            <div
              key={type.value}
              className={`relative rounded-lg border p-4 cursor-pointer ${
                formData.integrationType === type.value
                  ? 'border-primary bg-primary-50'
                  : 'border-gray-300'
              }`}
              onClick={() => setFormData({ ...formData, integrationType: type.value })}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{type.label}</h3>
                  <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    type="radio"
                    checked={formData.integrationType === type.value}
                    onChange={() => setFormData({ ...formData, integrationType: type.value })}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Typ smlouvy
        </label>
        <div className="mt-2 space-y-4">
          {CONTRACT_TYPES.map((type) => (
            <div
              key={type.value}
              className={`relative rounded-lg border p-4 cursor-pointer ${
                formData.contractType === type.value
                  ? 'border-primary bg-primary-50'
                  : 'border-gray-300'
              }`}
              onClick={() => setFormData({ ...formData, contractType: type.value })}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{type.label}</h3>
                  <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    type="radio"
                    checked={formData.contractType === type.value}
                    onChange={() => setFormData({ ...formData, contractType: type.value })}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Zpět
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Vytvořit e-shop
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Store className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Registrace nového e-shopu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Vyplňte informace o vašem e-shopu a zvolte způsob integrace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          {step === 1 ? renderStep1() : renderStep2()}
        </div>
      </form>
    </div>
  );
};
