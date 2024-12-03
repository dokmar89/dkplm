import React from 'react';
import { Button } from '../../ui/Button';
import { useSignup } from './SignupContext';
import { Building2, Hash, MapPin, Globe } from 'lucide-react';

export const Step2 = () => {
  const { data, updateData, nextStep, prevStep } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Company</label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.company}
            onChange={(e) => updateData({ company: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">IČO</label>
        <div className="relative">
          <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.ico}
            onChange={(e) => updateData({ ico: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <div className="relative">
          <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
};