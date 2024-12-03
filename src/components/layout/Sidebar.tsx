import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Paintbrush,
  CreditCard,
  LifeBuoy,
  Download,
  LogOut,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: User, label: 'Account', path: '/account' },
  { icon: Paintbrush, label: 'Customization', path: '/customization' },
  { icon: CreditCard, label: 'Billing', path: '/billing' },
  { icon: LifeBuoy, label: 'Support', path: '/support' },
  { icon: Download, label: 'Installation', path: '/installation' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <div className="space-y-4">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors',
                location.pathname === path
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};