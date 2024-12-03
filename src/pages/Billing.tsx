import React from 'react';
import { PricingTable } from '../components/billing/PricingTable';
import { WalletBalance } from '../components/billing/WalletBalance';
import { PaymentHistory } from '../components/billing/PaymentHistory';

export const Billing = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-6">
          <PricingTable />
          <WalletBalance />
        </div>
        <PaymentHistory />
      </div>
    </div>
  );
};