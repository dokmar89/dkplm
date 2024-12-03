import React from 'react';
import { MethodRatio } from '../components/dashboard/MethodRatio';
import { SuccessRatio } from '../components/dashboard/SuccessRatio';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium mb-4">Method Performance</h2>
            <MethodRatio />
          </section>
          <section>
            <h2 className="text-lg font-medium mb-4">Verification Success</h2>
            <SuccessRatio />
          </section>
          <section>
            <RecentActivity />
          </section>
        </div>
      </div>
    </div>
  );
};