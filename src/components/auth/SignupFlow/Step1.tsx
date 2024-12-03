import React from 'react';
import { Button } from '../../ui/Button';
import { useSignup } from './SignupContext';
import { User, Phone, Mail } from 'lucide-react';

export const Step1 = () => {
  const { data, updateData, nextStep } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Surname</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={data.surname}
              onChange={(e) => updateData({ surname: e.target.value })}
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Continue</Button>
    </form>
  );
};