import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { MessageSquare } from 'lucide-react';

export const TextSection = () => {
  const { text, updateText } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Texting</h2>
      <div className="space-y-4">
        {Object.entries(text).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()} Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={value}
                onChange={(e) => updateText({ [key]: e.target.value })}
                className="pl-10 w-full p-2 border rounded-md"
                placeholder={`Enter ${key} message`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};