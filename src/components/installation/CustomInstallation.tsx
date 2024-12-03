import React from 'react';
import { Code, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CustomInstallation = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Custom Installation</h2>
      <p className="text-gray-500 mb-6">
        Implement age verification in your custom application using our comprehensive
        documentation and guides.
      </p>
      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => window.open('/docs/api', '_blank')}
        >
          <div className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            API Documentation
          </div>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => window.open('/docs/integration', '_blank')}
        >
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Integration Guides
          </div>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};