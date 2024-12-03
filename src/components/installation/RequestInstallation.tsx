import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Store, Globe, Package } from 'lucide-react';

export const RequestInstallation = () => {
  const [formData, setFormData] = useState({
    eshopName: '',
    website: '',
    platform: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle installation request
    console.log('Installation request:', formData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Request Installation</h2>
      <p className="text-gray-500 mb-6">
        Let our team help you with the integration process.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">E-shop Name</label>
          <div className="relative">
            <Store className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.eshopName}
              onChange={(e) =>
                setFormData({ ...formData, eshopName: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Platform</label>
          <div className="relative">
            <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Email</label>
          <div className="relative">
            <Store className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Request
        </Button>
      </form>
    </div>
  );
};