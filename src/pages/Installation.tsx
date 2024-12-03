import React from 'react';
import { AutomaticInstallation } from '../components/installation/AutomaticInstallation';
import { CustomInstallation } from '../components/installation/CustomInstallation';
import { RequestInstallation } from '../components/installation/RequestInstallation';

export const Installation = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Installation</h1>
      <div className="grid gap-6">
        <AutomaticInstallation />
        <div className="grid grid-cols-2 gap-6">
          <CustomInstallation />
          <RequestInstallation />
        </div>
      </div>
    </div>
  );
};