import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  ShoppingBagIcon, 
  ClipboardListIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { 
      icon: <HomeIcon className="h-6 w-6" />, 
      label: 'Dashboard', 
      path: '/admin' 
    },
    { 
      icon: <ShoppingBagIcon className="h-6 w-6" />, 
      label: 'Products', 
      path: '/admin/products' 
    },
    { 
      icon: <ClipboardListIcon className="h-6 w-6" />, 
      label: 'Orders', 
      path: '/admin/orders' 
    },
    { 
      icon: <UserIcon className="h-6 w-6" />, 
      label: 'Customers', 
      path: '/admin/customers' 
    },
    { 
      icon: <CogIcon className="h-6 w-6" />, 
      label: 'Settings', 
      path: '/admin/settings' 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'w-64' : 'w-20'} 
        bg-white shadow-md transition-all duration-300 ease-in-out
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`
            ${isOpen ? 'block' : 'hidden'} 
            text-2xl font-bold text-primary-600
          `}>
            Admin
          </h1>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-primary-600"
          >
            {isOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="flex items-center p-4 hover:bg-gray-100 group"
            >
              {item.icon}
              <span className={`
                ${isOpen ? 'block ml-3' : 'hidden'} 
                text-gray-700 group-hover:text-primary-600
              `}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
