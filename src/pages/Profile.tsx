import React from 'react';
import { useAuthStore } from '../store/authStore';

export const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="space-y-2">
          <p><strong>User ID:</strong> {user?.uid}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
  );
};
