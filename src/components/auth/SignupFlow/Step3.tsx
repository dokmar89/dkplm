import React from 'react';
import { Button } from '../../ui/Button';
import { useSignup } from './SignupContext';
import { Lock, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Step3 = () => {
  const { data, updateData, prevStep } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <CheckSquare 
          className={`h-5 w-5 cursor-pointer ${
            data.acceptTerms ? 'text-primary' : 'text-gray-400'
          }`}
          onClick={() => updateData({ acceptTerms: !data.acceptTerms })}
        />
        <label className="text-sm">
          I accept the terms and conditions
        </label>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Registration Summary</h3>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Name:</dt>
              <dd>{data.name} {data.surname}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Email:</dt>
              <dd>{data.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Company:</dt>
              <dd>{data.company}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">IČO:</dt>
              <dd>{data.ico}</dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!data.acceptTerms}
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </form>
  );
};