import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const guides = [
  {
    platform: 'WooCommerce',
    description: 'Step-by-step WooCommerce integration guide',
    difficulty: 'Easy',
  },
  {
    platform: 'Shopify',
    description: 'Complete Shopify setup instructions',
    difficulty: 'Easy',
  },
  {
    platform: 'Custom Integration',
    description: 'Advanced API integration documentation',
    difficulty: 'Advanced',
  },
];

export const IntegrationGuides = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">Integration Guides</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <button
              key={index}
              className="w-full text-left group p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{guide.platform}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        guide.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {guide.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{guide.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};