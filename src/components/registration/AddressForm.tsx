import React from 'react';
import type { Address } from '../../types/registration';
import { MapPin } from 'lucide-react';

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ address, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Adresa společnosti</h3>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={address.street}
          onChange={(e) => onChange({ ...address, street: e.target.value })}
          placeholder="Ulice a číslo popisné"
          className="pl-10 w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={address.city}
          onChange={(e) => onChange({ ...address, city: e.target.value })}
          placeholder="Město"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          value={address.zip}
          onChange={(e) => onChange({ ...address, zip: e.target.value })}
          placeholder="PSČ"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <select
        value={address.country}
        onChange={(e) => onChange({ ...address, country: e.target.value })}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Vyberte zemi</option>
        <option value="CZ">Česká republika</option>
        <option value="SK">Slovenská republika</option>
      </select>
    </div>
  );
};