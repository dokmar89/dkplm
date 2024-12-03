import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Fingerprint, CreditCard, ScanLine } from 'lucide-react';

export const Preview = () => {
  const { branding, style, text, methods } = useCustomizationStore();

  const getButtonClass = () => {
    switch (style.buttonShape) {
      case 'square':
        return 'rounded-none';
      case 'pill':
        return 'rounded-full';
      default:
        return 'rounded-md';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-200">
      <h2 className="text-lg font-medium mb-4">Live Preview</h2>
      
      <div className="bg-gray-50 rounded-lg p-6">
        {branding.logo && (
          <img
            src={branding.logo}
            alt="Brand logo"
            className="h-8 mb-4"
          />
        )}
        
        <h3 className="text-xl font-medium mb-6" style={{ color: branding.primaryColor }}>
          {text.welcome}
        </h3>

        <div className="space-y-4">
          {methods.ocr && (
            <button
              className={`w-full flex items-center space-x-3 p-3 border ${getButtonClass()} hover:bg-gray-50`}
              style={{ borderColor: branding.primaryColor }}
            >
              <ScanLine className="h-5 w-5" style={{ color: branding.primaryColor }} />
              <span>Verify with OCR</span>
            </button>
          )}

          {methods.bankId && (
            <button
              className={`w-full flex items-center space-x-3 p-3 border ${getButtonClass()} hover:bg-gray-50`}
              style={{ borderColor: branding.primaryColor }}
            >
              <Fingerprint className="h-5 w-5" style={{ color: branding.primaryColor }} />
              <span>Verify with BankID</span>
            </button>
          )}

          {methods.mojeId && (
            <button
              className={`w-full flex items-center space-x-3 p-3 border ${getButtonClass()} hover:bg-gray-50`}
              style={{ borderColor: branding.primaryColor }}
            >
              <CreditCard className="h-5 w-5" style={{ color: branding.primaryColor }} />
              <span>Verify with MojeID</span>
            </button>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Powered by Age Verification
        </div>
      </div>
    </div>
  );
};