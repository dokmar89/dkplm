import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Paintbrush,
  CreditCard,
  LifeBuoy,
  Download,
  LogOut,
  Store,
  Building2,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import { isUserAdmin } from '../../services/userService';

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon: Icon, text }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(href)}
      className={cn(
        'w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors',
        location.pathname === href
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </button>
  );
};

export const Sidebar = () => {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.uid) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
    };

    checkAdminStatus();
  }, [user]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: User, label: 'Account', path: '/account' },
    { icon: Paintbrush, label: 'Customization', path: '/customization' },
    { icon: CreditCard, label: 'Billing', path: '/billing' },
    { icon: LifeBuoy, label: 'Support', path: '/support' },
    { icon: Download, label: 'Installation', path: '/installation' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <div className="space-y-4">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <SidebarItem key={path} href={path} icon={Icon} text={label} />
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