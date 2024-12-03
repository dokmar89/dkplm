import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Store } from 'lucide-react';

export const EshopSelector = () => {
  const { eshops, selectedEshop, setSelectedEshop } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Select E-shop</h2>
      <div className="grid grid-cols-3 gap-4">
        {eshops.map((eshop) => (
          <button
            key={eshop.id}
            onClick={() => setSelectedEshop(eshop.id)}
            className={`p-4 border rounded-lg text-left transition-colors ${
              selectedEshop === eshop.id
                ? 'border-primary bg-primary/5'
                : 'hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Store className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">{eshop.name}</h3>
                <p className="text-sm text-gray-500">{eshop.platform}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};