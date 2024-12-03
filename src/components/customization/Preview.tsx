import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Fingerprint, CreditCard, ScanLine, Camera } from 'lucide-react';

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
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <ScanLine className="h-5 w-5" />
              <span>OCR</span>
            </div>
          )}
          {methods.bankId && (
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <Fingerprint className="h-5 w-5" />
              <span>BankID</span>
            </div>
          )}
          {methods.mojeId && (
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <CreditCard className="h-5 w-5" />
              <span>MojeID</span>
            </div>
          )}
          {methods.aifacescan && (
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <Camera className="h-5 w-5" />
              <span>AI Face Scan</span>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Powered by Age Verification
        </div>
      </div>
    </div>
  );
};