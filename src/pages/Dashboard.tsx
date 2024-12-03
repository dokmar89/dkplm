import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MethodRatio } from '../components/dashboard/MethodRatio';
import { SuccessRatio } from '../components/dashboard/SuccessRatio';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { WalletOverview } from '../components/dashboard/WalletOverview';
import { useAuthStore } from '../store/authStore';

const mockTransactions = [
  {
    id: '1',
    amount: 5000,
    date: '2024-01-15',
    type: 'credit' as const,
  },
  {
    id: '2',
    amount: 150,
    date: '2024-01-14',
    type: 'debit' as const,
  },
  {
    id: '3',
    amount: 150,
    date: '2024-01-14',
    type: 'debit' as const,
  },
  {
    id: '4',
    amount: 10000,
    date: '2024-01-10',
    type: 'credit' as const,
  },
];

export const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button 
            onClick={() => navigate('/eshops/new')} 
            className="flex items-center gap-2"
          >
            <Store className="w-4 h-4" />
            Přidat E-shop
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-medium mb-4">Method Performance</h2>
              <MethodRatio />
            </section>
            <section>
              <h2 className="text-lg font-medium mb-4">Verification Success</h2>
              <SuccessRatio />
            </section>
          </div>
          <div className="space-y-6">
            <WalletOverview 
              balance={50000} 
              transactions={mockTransactions}
            />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};