import React from 'react';
import { 
  ShoppingCartIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div className="bg-primary-100 p-3 rounded-full">
        {icon}
      </div>
      <div className="text-right">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change}%
        </p>
      </div>
    </div>
  </div>
);

function AdminDashboard() {
  const stats = [
    {
      icon: <ShoppingCartIcon className="h-6 w-6 text-primary-600" />,
      title: 'Total Orders',
      value: '1,234',
      change: 12.5
    },
    {
      icon: <UserGroupIcon className="h-6 w-6 text-primary-600" />,
      title: 'Total Customers',
      value: '5,678',
      change: 8.2
    },
    {
      icon: <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />,
      title: 'Total Revenue',
      value: '$456,789',
      change: 15.7
    },
    {
      icon: <ChartBarIcon className="h-6 w-6 text-primary-600" />,
      title: 'Conversion Rate',
      value: '3.5%',
      change: 2.1
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="divide-y divide-gray-200">
          {[
            { 
              type: 'Order', 
              description: 'New order #1234 from John Doe', 
              time: '2 minutes ago' 
            },
            { 
              type: 'Product', 
              description: 'Low stock alert for Windsurf Board', 
              time: '1 hour ago' 
            },
            { 
              type: 'Customer', 
              description: 'New customer registration', 
              time: '3 hours ago' 
            }
          ].map((activity, index) => (
            <div key={index} className="py-4 flex justify-between items-center">
              <div>
                <span className={`
                  px-2 py-1 rounded-full text-xs mr-2
                  ${activity.type === 'Order' ? 'bg-blue-100 text-blue-800' : 
                    activity.type === 'Product' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'}
                `}>
                  {activity.type}
                </span>
                <span>{activity.description}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
