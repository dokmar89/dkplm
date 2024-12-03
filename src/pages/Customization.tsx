import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
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
  const navigate = useNavigate();
  const selectedEshop = useCustomizationStore((state) => state.selectedEshop);

  const handleSave = () => {
    // Handle saving customization settings
    console.log('Saving customization settings...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customization</h1>
        <Button 
          onClick={() => navigate('/eshops/new')} 
          className="flex items-center gap-2"
        >
          <Store className="w-4 h-4" />
          Přidat E-shop
        </Button>
      </div>
      
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