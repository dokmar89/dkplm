import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Type } from 'lucide-react';

const fonts = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
];

const buttonShapes = [
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'pill', label: 'Pill' },
];

export const StyleSection = () => {
  const { style, updateStyle } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Font & Style</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Font Family</label>
          <div className="relative">
            <Type className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={style.font}
              onChange={(e) => updateStyle({ font: e.target.value as any })}
              className="pl-10 w-full p-2 border rounded-md"
            >
              {fonts.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Button Shape</label>
          <div className="grid grid-cols-3 gap-2">
            {buttonShapes.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateStyle({ buttonShape: value as any })}
                className={`p-2 border rounded-md text-center ${
                  style.buttonShape === value
                    ? 'border-primary text-primary bg-primary/5'
                    : 'hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};