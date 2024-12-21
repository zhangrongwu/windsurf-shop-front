import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  CheckIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { OrderService } from '../../services/apiService';

const OrderStatusBadge = ({ status }) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`
      px-2 py-1 rounded-full text-xs
      ${statusColors[status] || 'bg-gray-100 text-gray-800'}
    `}>
      {status}
    </span>
  );
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await OrderService.getAllOrders();
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      setLoading(false);
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      const orderDetails = await OrderService.getOrderDetails(orderId);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error('Failed to fetch order details', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await OrderService.updateOrderStatus(orderId, newStatus);
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">${order.total.toFixed(2)}</td>
                <td className="p-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 flex space-x-2">
                  <button 
                    onClick={() => handleViewOrderDetails(order.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  {order.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Customer Details</h3>
                <p>{selectedOrder.customerName}</p>
                <p>{selectedOrder.customerEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold">Order Information</h3>
                <p>Status: <OrderStatusBadge status={selectedOrder.status} /></p>
                <p>Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <h3 className="font-semibold mb-4">Order Items</h3>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right">
              <p className="font-bold text-xl">
                Total: ${selectedOrder.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
