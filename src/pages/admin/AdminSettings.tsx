import React, { useState } from 'react';

const AdminSettings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleSave = () => {
    // 这里可以添加保存设置的逻辑
    console.log('Settings saved:', { email, password, notificationsEnabled });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Settings</h1>
      <form onSubmit={e => { e.preventDefault(); handleSave(); }} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 w-full rounded-md border border-gray-300"
            placeholder="Enter a new password"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
