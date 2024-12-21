import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '../../types/product';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../services/api';
import { useError } from '../../contexts/ErrorContext';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);

  const { user } = useAuth();
  const { showError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getProducts();
      setProducts(response);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleSaveProduct = async (formData: Partial<Product>) => {
    try {
      if ('id' in selectedProduct) {
        // Edit existing product
        const updatedProduct = await ApiService.updateProduct(selectedProduct.id!, formData);
        setProducts(products.map(p => 
          p.id === selectedProduct.id ? updatedProduct : p
        ));
      } else {
        // Add new product
        const newProduct = await ApiService.createProduct(formData);
        setProducts([...products, newProduct]);
      }
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (err: any) {
      showError(err.message || 'Failed to save product');
    }
  };

  const handleDelete = async (productId: number | string) => {
    try {
      await ApiService.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (err: any) {
      showError(err.message || 'Failed to delete product');
    }
  };

  // Ensure only admin can access
  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You do not have permission to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Products</h2>
          {user?.role === 'ADMIN' && (
            <Link
              to="/admin/products/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Product
            </Link>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={product.images?.[0]?.url || '/placeholder.png'} 
                          alt={product.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {selectedProduct?.id ? 'Edit Product' : 'Add Product'}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={selectedProduct?.name || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <select
                    value={selectedProduct?.category?.name || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      category: { name: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    <option value="Boards">Boards</option>
                    <option value="Sails">Sails</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Brand"
                    value={selectedProduct?.brand || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      brand: e.target.value
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={selectedProduct?.price || 0}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value)
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={selectedProduct?.stock || 0}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      stock: parseInt(e.target.value)
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <textarea
                    placeholder="Description"
                    value={selectedProduct?.description || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={selectedProduct?.images?.[0]?.url || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      images: [{ url: e.target.value }]
                    })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProduct(selectedProduct!)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
