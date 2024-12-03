import React from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Store, 
  Globe, 
  Package, 
  Download,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';

const platforms = [
  {
    name: 'WooCommerce',
    icon: ShoppingCart,
    description: 'WordPress e-commerce platform',
    status: 'ready',
  },
  {
    name: 'Shoptet',
    icon: Store,
    description: 'Czech e-commerce platform',
    status: 'ready',
  },
  {
    name: 'Shopify',
    icon: ShoppingBag,
    description: 'Cloud-based commerce platform',
    status: 'ready',
  },
  {
    name: 'Upgates',
    icon: Globe,
    description: 'E-commerce solution',
    status: 'coming',
  },
  {
    name: 'Magento',
    icon: Package,
    description: 'Enterprise e-commerce platform',
    status: 'coming',
  },
  {
    name: 'PrestaShop',
    icon: Store,
    description: 'Open-source e-commerce solution',
    status: 'coming',
  },
];

export const AutomaticInstallation = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Automatic Installation</h2>
      <div className="grid grid-cols-3 gap-4">
        {platforms.map(({ name, icon: Icon, description, status }) => (
          <div
            key={name}
            className="border rounded-lg p-4 relative"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{name}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {status === 'ready' ? (
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Install Now
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};