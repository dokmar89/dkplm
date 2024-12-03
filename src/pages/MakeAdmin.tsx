import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const MakeAdmin = () => {
  const { user } = useAuthStore();
  const [status, setStatus] = useState('');

  const makeAdmin = async () => {
    if (!user) {
      setStatus('No user logged in');
      return;
    }

    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        role: {
          type: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setStatus('Successfully made you an admin! Please refresh the page.');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error making admin: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Make Admin</h1>
        <div className="space-y-4">
          <div>
            <p><strong>Current User ID:</strong> {user?.uid}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
          <button
            onClick={makeAdmin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Make Me Admin
          </button>
          {status && (
            <p className={status.includes('Error') ? 'text-red-500' : 'text-green-500'}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
