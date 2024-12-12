import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';

const App: React.FC = () => {
  const paypalOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID!,
    currency: 'USD',
  };

  return (
    <ErrorBoundary>
      <ErrorProvider>
        <NotificationProvider>
          <PayPalScriptProvider options={paypalOptions}>
            <AuthProvider>
              <CartProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route
                          path="/checkout"
                          element={
                            <PrivateRoute>
                              <Checkout />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/orders/:id/success"
                          element={
                            <PrivateRoute>
                              <OrderSuccess />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/orders"
                          element={
                            <PrivateRoute>
                              <Orders />
                            </PrivateRoute>
                          }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                          path="/admin"
                          element={
                            <PrivateRoute admin>
                              <AdminDashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/admin/products"
                          element={
                            <PrivateRoute admin>
                              <AdminProducts />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/admin/orders"
                          element={
                            <PrivateRoute admin>
                              <AdminOrders />
                            </PrivateRoute>
                          }
                        />
                      </Routes>
                    </main>
                  </div>
                </Router>
              </CartProvider>
            </AuthProvider>
          </PayPalScriptProvider>
        </NotificationProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
};

export default App;
