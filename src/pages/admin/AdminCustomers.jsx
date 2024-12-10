import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { CustomerService } from '../../services/apiService';

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await CustomerService.getAllCustomers();
      setCustomers(fetchedCustomers);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch customers', error);
      setLoading(false);
    }
  };

  const handleViewCustomerDetails = async (customerId) => {
    try {
      const customerDetails = await CustomerService.getCustomerDetails(customerId);
      setSelectedCustomer(customerDetails);
    } catch (error) {
      console.error('Failed to fetch customer details', error);
    }
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Total Orders</th>
              <th className="p-4 text-left">Registration Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.totalOrders}</td>
                <td className="p-4">{new Date(customer.registrationDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <button 
                    onClick={() => handleViewCustomerDetails(customer.id)}
                    className="text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Customer Profile</h2>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mr-6">
                <UserIcon className="h-12 w-12 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                <p className="text-gray-600">{selectedCustomer.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span>{selectedCustomer.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center col-span-2">
                <MapPinIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span>{selectedCustomer.address || 'No address provided'}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Order History</h4>
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Order ID</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomer.orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-2">#{order.id}</td>
                      <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-2">${order.total.toFixed(2)}</td>
                      <td className="p-2">
                        <span className={`
                          px-2 py-1 rounded-full text-xs
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCustomers;
