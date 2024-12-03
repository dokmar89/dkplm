import React from 'react';
import { EshopSelector } from '../components/customization/EshopSelector';
import { BrandingSection } from '../components/customization/BrandingSection';
import { StyleSection } from '../components/customization/StyleSection';
import { TextSection } from '../components/customization/TextSection';
import { MethodsSection } from '../components/customization/MethodsSection';
import { IntegrationSection } from '../components/customization/IntegrationSection';
import { NotificationsSection } from '../components/customization/NotificationsSection';
import { Preview } from '../components/customization/Preview';
import { useCustomizationStore } from '../store/customizationStore';
import { Button } from '../components/ui/Button';

export const Customization = () => {
  const selectedEshop = useCustomizationStore((state) => state.selectedEshop);

  const handleSave = () => {
    // Handle saving customization settings
    console.log('Saving customization settings...');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Customization</h1>
      
      <EshopSelector />

      {selectedEshop && (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <BrandingSection />
            <StyleSection />
            <TextSection />
            <MethodsSection />
            <IntegrationSection />
            <NotificationsSection />
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
          
          <div className="sticky top-6">
            <Preview />
          </div>
        </div>
      )}
    </div>
  );
};