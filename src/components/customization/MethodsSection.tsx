import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Fingerprint, CreditCard, ScanLine, Camera } from 'lucide-react';

const methods = [
  { key: 'ocr', label: 'OCR', icon: ScanLine },
  { key: 'bankId', label: 'BankID', icon: Fingerprint },
  { key: 'mojeId', label: 'MojeID', icon: CreditCard },
  { key: 'aifacescan', label: 'AI Face Scan', icon: Camera },
];

export const MethodsSection = () => {
  const { methods: enabledMethods, updateMethods } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Available Methods</h2>
      <div className="grid grid-cols-3 gap-4">
        {methods.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => updateMethods({ [key]: !enabledMethods[key] })}
            className={`p-4 border rounded-lg text-left transition-colors ${
              enabledMethods[key]
                ? 'border-primary bg-primary/5'
                : 'hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className={`h-5 w-5 ${
                enabledMethods[key] ? 'text-primary' : 'text-gray-400'
              }`} />
              <span className="font-medium">{label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};