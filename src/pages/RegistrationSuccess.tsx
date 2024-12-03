import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">
          Registrace byla úspěšně odeslána
        </h1>
        
        <p className="text-gray-600 mb-6">
          Vaše žádost o registraci byla přijata a bude zpracována našimi pracovníky.
          O výsledku vás budeme informovat e-mailem.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Očekávaná doba zpracování je 1-2 pracovní dny.
          </p>
          
          <Button
            onClick={() => navigate('/')}
            className="w-full"
          >
            Zpět na hlavní stránku
          </Button>
        </div>
      </div>
    </div>
  );
};