import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Image, Palette } from 'lucide-react';

export const BrandingSection = () => {
  const { branding, updateBranding } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Branding</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Brand Name</label>
          <input
            type="text"
            value={branding.name}
            onChange={(e) => updateBranding({ name: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter brand name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <div className="relative">
            <Image className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={branding.logo}
              onChange={(e) => updateBranding({ logo: e.target.value })}
              className="pl-10 w-full p-2 border rounded-md"
              placeholder="Enter logo URL"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primary Color</label>
            <div className="relative">
              <Palette className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="color"
                value={branding.primaryColor}
                onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                className="pl-10 w-full p-1 border rounded-md h-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Secondary Color</label>
            <div className="relative">
              <Palette className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="color"
                value={branding.secondaryColor}
                onChange={(e) => updateBranding({ secondaryColor: e.target.value })}
                className="pl-10 w-full p-1 border rounded-md h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};