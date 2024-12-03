import React, { useState } from 'react';
import { Building2, ShoppingBag, Wallet, Plus, X } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import type { Company } from '../../types/company';

interface CompanyOverviewProps {
  company: Company;
  eshopsCount: number;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company, eshopsCount }) => {
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [amount, setAmount] = useState('');

  const handleCharge = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement wallet charging logic
    console.log('Charging wallet with:', amount);
    setShowChargeModal(false);
    setAmount('');
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Společnost</h3>
              <p className="text-lg font-semibold">{company.companyName}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>IČO: {company.companyId}</p>
            <p>DIČ: {company.dic}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">E-shopy</h3>
              <p className="text-lg font-semibold">{eshopsCount}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Aktivní: {eshopsCount}</p>
            <p>Typ smlouvy: {company.contractType}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Wallet className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Kredit</h3>
              <p className="text-lg font-semibold">{formatCurrency(company.walletBalance)}</p>
            </div>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => setShowChargeModal(true)}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Dobít kredit</span>
            </button>
          </div>
        </div>
      </div>

      {showChargeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Dobít kredit</h2>
              <button 
                onClick={() => setShowChargeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCharge} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Částka</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Zadejte částku"
                    required
                  />
                  <span className="absolute right-3 top-2 text-gray-500">Kč</span>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
              >
                Potvrdit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};