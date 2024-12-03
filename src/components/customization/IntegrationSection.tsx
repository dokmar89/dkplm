import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Link } from 'lucide-react';

const integrationTypes = [
  { value: 'modal', label: 'Modal' },
  { value: 'redirect', label: 'Redirect' },
  { value: 'new-window', label: 'New Window' },
  { value: 'iframe', label: 'IFrame' },
  { value: 'widget', label: 'Widget' },
];

export const IntegrationSection = () => {
  const { integration, updateIntegration } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Integration</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Integration Type</label>
          <div className="grid grid-cols-3 gap-2">
            {integrationTypes.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateIntegration({ type: value as any })}
                className={`p-2 border rounded-md text-center ${
                  integration.type === value
                    ? 'border-primary text-primary bg-primary/5'
                    : 'hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Denied Verification Redirect URL
          </label>
          <div className="relative">
            <Link className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={integration.deniedRedirectUrl}
              onChange={(e) =>
                updateIntegration({ deniedRedirectUrl: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              placeholder="Enter redirect URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
};