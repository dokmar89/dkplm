import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

const apiSections = [
  {
    title: 'Authentication',
    description: 'Learn how to authenticate your API requests',
    endpoint: '/api/v1/auth',
  },
  {
    title: 'Verification',
    description: 'Implement age verification in your application',
    endpoint: '/api/v1/verify',
  },
  {
    title: 'Webhooks',
    description: 'Handle verification result notifications',
    endpoint: '/api/v1/webhooks',
  },
];

export const ApiDocs = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">API Documentation</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {apiSections.map((section, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{section.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4">
                <code className="text-sm bg-gray-50 px-2 py-1 rounded">
                  {section.endpoint}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};