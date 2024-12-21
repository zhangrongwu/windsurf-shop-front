import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import { Product, ProductFormData } from '../../types/product';
import ApiService from '../../services/api';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Pro Windsurf Board',
    category: 'Boards',
    price: 999.99,
    stock: 15,
    brand: 'WindMaster'
  },
  {
    id: 2,
    name: 'Performance Sail',
    category: 'Sails',
    price: 599.99,
    stock: 25,
    brand: 'OceanPro'
  },
  {
    id: 3,
    name: 'Carbon Mast',
    category: 'Equipment',
    price: 299.99,
    stock: 10,
    brand: 'WindTech'
  }
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    brand: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetchProducts();
  }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await ApiService.getProducts();
  //     setProducts(response);
  //   } catch (err) {
  //     setError('Failed to fetch products');
  //     console.error('Error fetching products:', err);
  //   }
  // };

  const handleAddProduct = () => {
    setSelectedProduct({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      brand: ''
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSaveProduct = () => {
    if ('id' in selectedProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? selectedProduct : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...selectedProduct,
        id: products.length + 1
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <button 
          onClick={handleAddProduct}
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.brand}</td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${product.stock > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 flex space-x-2">
                  <button 
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6">
              {selectedProduct.id ? 'Edit Product' : 'Add Product'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({
                  ...selectedProduct,
                  name: e.target.value
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <select
                value={selectedProduct.category}
                onChange={(e) => setSelectedProduct({
                  ...selectedProduct,
                  category: e.target.value
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
                value={selectedProduct.brand}
                onChange={(e) => setSelectedProduct({
                  ...selectedProduct,
                  brand: e.target.value
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={selectedProduct.price}
                onChange={(e) => setSelectedProduct({
                  ...selectedProduct,
                  price: parseFloat(e.target.value)
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Stock"
                value={selectedProduct.stock}
                onChange={(e) => setSelectedProduct({
                  ...selectedProduct,
                  stock: parseInt(e.target.value)
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
