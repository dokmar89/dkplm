import React from 'react';
import { UserProfile } from '../components/account/UserProfile';
import { CompanyDetails } from '../components/account/CompanyDetails';
import { SecuritySettings } from '../components/account/SecuritySettings';

export const Account = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div className="grid gap-6">
        <UserProfile />
        <CompanyDetails />
        <SecuritySettings />
      </div>
    </div>
  );
};