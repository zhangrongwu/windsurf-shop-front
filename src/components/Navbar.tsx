import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: '首页', href: '/' },
  { name: '产品', href: '/products' },
  { name: '关于', href: '/about' },
  { name: '联系', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state: { items } } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                WindsurfShop
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 hover:text-primary-600" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary-600 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-900 hover:text-primary-600"
                >
                  个人中心
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-gray-900 hover:text-primary-600"
                  >
                    管理后台
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-900 hover:text-primary-600"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-900 hover:text-primary-600"
              >
                登录
              </Link>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">打开菜单</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/profile"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500"
                onClick={() => setIsOpen(false)}
              >
                个人中心
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500"
                  onClick={() => setIsOpen(false)}
                >
                  管理后台
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500"
              >
                退出登录
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500"
              onClick={() => setIsOpen(false)}
            >
              登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
