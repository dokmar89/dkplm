import React from 'react';
import { Building2, Hash, MapPin, Globe } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const CompanyDetails = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Company Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={user?.company || ''}
              className="pl-10 w-full p-2 border rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">IČO</label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={user?.ico || ''}
              className="pl-10 w-full p-2 border rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value="Na Příkopě 1, 110 00 Prague"
              className="pl-10 w-full p-2 border rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value="https://example.com"
              className="pl-10 w-full p-2 border rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};