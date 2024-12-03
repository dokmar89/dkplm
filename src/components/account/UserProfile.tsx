import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const UserProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={user?.name || ''}
                className="pl-10 w-full p-2 border rounded-md bg-gray-50"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Surname</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={user?.surname || ''}
                className="pl-10 w-full p-2 border rounded-md bg-gray-50"
                disabled
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={user?.email || ''}
              className="pl-10 w-full p-2 border rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value="+420 123 456 789"
              className="pl-10 w-full p-2 border rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};