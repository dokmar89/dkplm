import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface VerificationStats {
  status: string;
  icon: React.FC<{ className?: string }>;
  count: number;
  label: string;
  color: string;
}

const stats: VerificationStats[] = [
  {
    status: 'Over 18',
    icon: CheckCircle,
    count: 245,
    label: 'Successful verifications',
    color: 'text-green-500',
  },
  {
    status: 'Under 18',
    icon: XCircle,
    count: 32,
    label: 'Failed verifications',
    color: 'text-red-500',
  },
  {
    status: 'Unfinished',
    icon: Clock,
    count: 18,
    label: 'Pending verifications',
    color: 'text-yellow-500',
  },
];

export const SuccessRatio = () => {
  const total = stats.reduce((acc, stat) => acc + stat.count, 0);

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ status, icon: Icon, count, label, color }) => {
        const percentage = Math.round((count / total) * 100);
        return (
          <div key={status} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-2">
              <Icon className={`h-6 w-6 ${color}`} />
              <h3 className="font-medium">{status}</h3>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{count}</span>
              <span className="text-sm text-gray-500">({percentage}%)</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
          </div>
        );
      })}
    </div>
  );
};