import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Mail } from 'lucide-react';

export const NotificationsSection = () => {
  const { notifications, updateNotifications } = useCustomizationStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-medium">Email Notifications</h2>
          <p className="text-sm text-gray-500">
            Receive email notifications for verification events
          </p>
        </div>
        <button
          onClick={() => updateNotifications({ enabled: !notifications.enabled })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            notifications.enabled ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notifications.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {notifications.enabled && (
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={notifications.email}
            onChange={(e) => updateNotifications({ email: e.target.value })}
            className="pl-10 w-full p-2 border rounded-md"
            placeholder="Enter notification email"
          />
        </div>
      )}
    </div>
  );
};