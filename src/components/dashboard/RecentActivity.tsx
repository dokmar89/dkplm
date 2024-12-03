import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface Activity {
  id: string;
  timestamp: string;
  method: string;
  status: 'success' | 'failed' | 'pending';
  price: number;
}

const activities: Activity[] = [
  {
    id: 'VER-001',
    timestamp: '2024-03-15 14:30',
    method: 'BankID',
    status: 'success',
    price: 15,
  },
  {
    id: 'VER-002',
    timestamp: '2024-03-15 14:25',
    method: 'OCR',
    status: 'failed',
    price: 10,
  },
  {
    id: 'VER-003',
    timestamp: '2024-03-15 14:20',
    method: 'MojeID',
    status: 'pending',
    price: 12,
  },
  // Add more activities as needed
];

const StatusIcon = ({ status }: { status: Activity['status'] }) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
  }
};

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Recent Activity</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Timestamp</th>
              <th className="p-4 font-medium">Method</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-t">
                <td className="p-4">{activity.id}</td>
                <td className="p-4">{activity.timestamp}</td>
                <td className="p-4">{activity.method}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <StatusIcon status={activity.status} />
                    <span className="capitalize">{activity.status}</span>
                  </div>
                </td>
                <td className="p-4">{formatCurrency(activity.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};