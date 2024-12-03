import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { EshopFormData, IntegrationType, Sector, ContractType } from '../../types/eshop';
import { useAuthStore } from '../../store/authStore';
import { eshopService } from '../../services/eshopService';
import toast from '../../components/toast';

const sectors: { value: Sector; label: string }[] = [
  { value: 'pyrotechnics', label: 'Pyrotechnika' },
  { value: 'weapons', label: 'Zbraně' },
  { value: 'tobacco', label: 'Kuřivo' },
  { value: 'other', label: 'Ostatní' },
];

const integrationTypes: { value: IntegrationType; label: string; description: string }[] = [
  { 
    value: 'api', 
    label: 'API Integrace',
    description: 'Vlastní implementace pomocí našeho API'
  },
  { 
    value: 'modal', 
    label: 'Modální okno',
    description: 'Přizpůsobitelné modální okno pro ověření'
  },
  { 
    value: 'sdk', 
    label: 'SDK/Plugin',
    description: 'Hotové řešení pro vybrané e-commerce platformy'
  },
];

const contractTypes: { value: ContractType; label: string; description: string }[] = [
  {
    value: 'fixed',
    label: 'Smlouva na 2 roky',
    description: 'Zvýhodněné ceny za ověření'
  },
  {
    value: 'flexible',
    label: 'Bez smlouvy',
    description: 'Standardní ceny'
  },
];

export const EshopRegistrationForm: React.FC = () => {
  const { register, handleSubmit, control, watch } = useForm<EshopFormData>();
  const { user } = useAuthStore();
  const integrationType = watch('integrationType');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: EshopFormData) => {
    if (!user?.uid) {
      setError('Uživatel není přihlášen');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const result = await eshopService.registerEshop(data, user.uid);
      
      // Show success message or redirect
      toast.success('E-shop byl úspěšně zaregistrován');
      
      // You might want to redirect to a details page or dashboard
      // navigate(`/eshops/${result.id}`);
    } catch (error) {
      console.error('Error registering eshop:', error);
      setError('Došlo k chybě při registraci e-shopu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Přidat nový e-shop</h2>

        {/* Základní informace */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Název e-shopu
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webová adresa
            </label>
            <input
              type="url"
              {...register('url', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sektor
            </label>
            <select
              {...register('sector', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {sectors.map(sector => (
                <option key={sector.value} value={sector.value}>
                  {sector.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Způsob integrace */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Způsob integrace
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {integrationTypes.map(type => (
              <div
                key={type.value}
                className="relative rounded-lg border p-4 hover:border-blue-500 cursor-pointer"
              >
                <label className="flex items-start">
                  <input
                    type="radio"
                    {...register('integrationType', { required: true })}
                    value={type.value}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium">{type.label}</span>
                    <span className="block text-sm text-gray-500">{type.description}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Modální okno nastavení */}
        {integrationType === 'modal' && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Nastavení modálního okna</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                {...register('branding.logo')}
                className="mt-1 block w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primární barva
                </label>
                <input
                  type="color"
                  {...register('branding.primaryColor')}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sekundární barva
                </label>
                <input
                  type="color"
                  {...register('branding.secondaryColor')}
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Úvodní text
              </label>
              <textarea
                {...register('branding.texts.intro')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text při schválení
              </label>
              <textarea
                {...register('branding.texts.approved')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text při zamítnutí
              </label>
              <textarea
                {...register('branding.texts.rejected')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
            </div>
          </div>
        )}

        {/* Metody ověření */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">Povolené metody ověření</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('verificationMethods.bankId')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span>BankID</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('verificationMethods.mojeId')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span>MojeID</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('verificationMethods.idCard')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span>Občanský průkaz</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('verificationMethods.passport')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span>Cestovní pas</span>
            </label>
          </div>
        </div>

        {/* Typ smlouvy */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">Typ smlouvy</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contractTypes.map(type => (
              <div
                key={type.value}
                className="relative rounded-lg border p-4 hover:border-blue-500 cursor-pointer"
              >
                <label className="flex items-start">
                  <input
                    type="radio"
                    {...register('contractType', { required: true })}
                    value={type.value}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium">{type.label}</span>
                    <span className="block text-sm text-gray-500">{type.description}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Zrušit
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Ukládám...' : 'Uložit'}
        </button>
      </div>
    </form>
  );
};
