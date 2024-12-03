import React from 'react';
import { CreditCard, Fingerprint, ScanLine } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

const pricingItems = [
  {
    method: 'BankID Verification',
    icon: Fingerprint,
    price: 15,
    description: 'Secure bank identity verification',
  },
  {
    method: 'MojeID Verification',
    icon: CreditCard,
    price: 12,
    description: 'Government identity verification',
  },
  {
    method: 'OCR Verification',
    icon: ScanLine,
    price: 10,
    description: 'Document scanning and verification',
  },
];

export const PricingTable = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Current Pricing</h2>
      <div className="space-y-4">
        {pricingItems.map(({ method, icon: Icon, price, description }) => (
          <div
            key={method}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{method}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <div className="text-lg font-semibold">
              {formatCurrency(price)}
              <span className="text-sm text-gray-500 ml-1">/ verification</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};