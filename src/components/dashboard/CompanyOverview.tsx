import React from 'react';
import { Building2, ShoppingBag, Wallet } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import type { Company } from '../../types/company';

interface CompanyOverviewProps {
  company: Company;
  eshopsCount: number;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company, eshopsCount }) => {
  return (
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
          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90">
            Dobít kredit
          </button>
        </div>
      </div>
    </div>
  );
};