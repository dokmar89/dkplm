import React from 'react';
import { Plus, Store, Globe, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Eshop } from '../../types/company';
import { useNavigate } from 'react-router-dom';

interface EshopListProps {
  eshops: Eshop[];
}

export const EshopList: React.FC<EshopListProps> = ({ eshops }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Moje E-shopy</h2>
        <Button onClick={() => navigate('/eshops/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Přidat E-shop
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {eshops.map((eshop) => (
          <div key={eshop.eshopId} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Store className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">{eshop.shopName}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{eshop.websiteUrl}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/eshops/${eshop.eshopId}`)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sektor:</span>
                  <span className="font-medium">{eshop.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Integrace:</span>
                  <span className="font-medium">{eshop.integrationMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Metody:</span>
                  <span className="font-medium">{eshop.allowedMethods.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};