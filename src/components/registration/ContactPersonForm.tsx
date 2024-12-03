import React from 'react';
import type { ContactPerson } from '../../types/registration';
import { User, Mail, Phone } from 'lucide-react';

interface ContactPersonFormProps {
  contactPerson: ContactPerson;
  onChange: (contactPerson: ContactPerson) => void;
}

export const ContactPersonForm: React.FC<ContactPersonFormProps> = ({ 
  contactPerson, 
  onChange 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Kontaktní osoba</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={contactPerson.firstName}
            onChange={(e) => onChange({ ...contactPerson, firstName: e.target.value })}
            placeholder="Jméno"
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={contactPerson.lastName}
            onChange={(e) => onChange({ ...contactPerson, lastName: e.target.value })}
            placeholder="Příjmení"
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="email"
          value={contactPerson.email}
          onChange={(e) => onChange({ ...contactPerson, email: e.target.value })}
          placeholder="E-mail"
          className="pl-10 w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="tel"
          value={contactPerson.phone}
          onChange={(e) => onChange({ ...contactPerson, phone: e.target.value })}
          placeholder="Telefon"
          className="pl-10 w-full p-2 border rounded-md"
          required
        />
      </div>
    </div>
  );
};