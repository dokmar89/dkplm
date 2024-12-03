import React from 'react';
import { Fingerprint, Phone, CreditCard, ScanLine } from 'lucide-react';

interface MethodStats {
  method: string;
  icon: React.FC<{ className?: string }>;
  count: number;
  total: number;
}

const methods: MethodStats[] = [
  { method: 'BankID', icon: Fingerprint, count: 150, total: 200 },
  { method: 'MojeID', icon: CreditCard, count: 80, total: 100 },
  { method: 'OCR', icon: ScanLine, count: 120, total: 150 },
  { method: 'Phone', icon: Phone, count: 90, total: 120 },
];

export const MethodRatio = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {methods.map(({ method, icon: Icon, count, total }) => {
        const percentage = Math.round((count / total) * 100);
        return (
          <div key={method} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <Icon className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{method}</h3>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {count} of {total} verifications
            </p>
          </div>
        );
      })}
    </div>
  );
};