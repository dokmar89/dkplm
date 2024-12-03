import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Globe, Package, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { createEshop } from '../services/companyService';

interface FormData {
  shopName: string;
  websiteUrl: string;
  platform: string;
  sector: string;
  integrationMethod: string;
  allowedMethods: string[];
}

export const NewEshop = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    shopName: '',
    websiteUrl: '',
    platform: '',
    sector: '',
    integrationMethod: 'API',
    allowedMethods: ['ocr', 'bankId', 'mojeId', 'aifacescan'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.company) {
      console.error('No company ID found');
      return;
    }

    try {
      await createEshop(user.company, {
        shopName: formData.shopName,
        websiteUrl: formData.websiteUrl,
        platform: formData.platform,
        sector: formData.sector,
        integrationMethod: formData.integrationMethod,
        allowedMethods: formData.allowedMethods,
      });
      navigate('/client-dashboard');
    } catch (error) {
      console.error('Error creating e-shop:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New E-shop</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">E-shop Name</label>
            <div className="relative">
              <Store className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.shopName}
                onChange={(e) =>
                  setFormData({ ...formData, shopName: e.target.value })
                }
                className="pl-10 w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Website URL</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({ ...formData, websiteUrl: e.target.value })
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
              <select
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
                className="pl-10 w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Platform</option>
                <option value="WooCommerce">WooCommerce</option>
                <option value="Shopify">Shopify</option>
                <option value="Magento">Magento</option>
                <option value="PrestaShop">PrestaShop</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sector</label>
            <div className="relative">
              <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.sector}
                onChange={(e) =>
                  setFormData({ ...formData, sector: e.target.value })
                }
                className="pl-10 w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Sector</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food & Beverage</option>
                <option value="Health">Health & Beauty</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Verification Methods</label>
            <div className="space-y-2">
              {['ocr', 'bankId', 'mojeId', 'aifacescan'].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.allowedMethods.includes(method)}
                    onChange={(e) => {
                      const updatedMethods = e.target.checked
                        ? [...formData.allowedMethods, method]
                        : formData.allowedMethods.filter((m) => m !== method);
                      setFormData({ ...formData, allowedMethods: updatedMethods });
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/client-dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit">Create E-shop</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
