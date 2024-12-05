import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Pro Windsurf Board',
    price: 999.99,
    image: 'https://placehold.co/600x400',
    category: 'Boards',
    description: 'Professional grade windsurfing board for experienced riders.',
  },
  {
    id: 2,
    name: 'Performance Sail',
    price: 599.99,
    image: 'https://placehold.co/600x400',
    category: 'Sails',
    description: 'High-performance sail with excellent wind response.',
  },
  {
    id: 3,
    name: 'Carbon Mast',
    price: 299.99,
    image: 'https://placehold.co/600x400',
    category: 'Equipment',
    description: 'Lightweight carbon fiber mast for optimal performance.',
  },
  // Add more products as needed
];

const categories = ['All', 'Boards', 'Sails', 'Equipment'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(
    product => selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // featured
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {sortedProducts.map((product) => (
          <Link 
            key={product.id} 
            to={`/products/${product.id}`}
            className="group"
          >
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
