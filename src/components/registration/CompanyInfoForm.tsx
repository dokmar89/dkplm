import React from 'react';
import { Building2, Hash } from 'lucide-react';

interface CompanyInfoFormProps {
  companyName: string;
  ico: string;
  dic: string;
  onCompanyNameChange: (value: string) => void;
  onIcoChange: (value: string) => void;
  onDicChange: (value: string) => void;
}

export const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({
  companyName,
  ico,
  dic,
  onCompanyNameChange,
  onIcoChange,
  onDicChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informace o společnosti</h3>
      
      <div className="relative">
        <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="Název společnosti"
          className="pl-10 w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={ico}
            onChange={(e) => onIcoChange(e.target.value)}
            placeholder="IČO"
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="relative">
          <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={dic}
            onChange={(e) => onDicChange(e.target.value)}
            placeholder="DIČ"
            className="pl-10 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
    </div>
  );
};