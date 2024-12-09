import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  AdjustmentsHorizontalIcon, 
  FunnelIcon 
} from '@heroicons/react/24/outline';

const products = [
  {
    id: 1,
    name: 'Pro Windsurf Board',
    price: 999.99,
    image: 'https://placehold.co/600x400?text=Pro+Board',
    category: 'Boards',
    description: 'Professional grade windsurfing board for experienced riders.',
    brand: 'WindMaster',
    skill: 'Advanced',
    inStock: true
  },
  {
    id: 2,
    name: 'Performance Sail',
    price: 599.99,
    image: 'https://placehold.co/600x400?text=Performance+Sail',
    category: 'Sails',
    description: 'High-performance sail with excellent wind response.',
    brand: 'OceanPro',
    skill: 'Intermediate',
    inStock: true
  },
  {
    id: 3,
    name: 'Carbon Mast',
    price: 299.99,
    image: 'https://placehold.co/600x400?text=Carbon+Mast',
    category: 'Equipment',
    description: 'Lightweight carbon fiber mast for optimal performance.',
    brand: 'WindTech',
    skill: 'All Levels',
    inStock: false
  },
  {
    id: 4,
    name: 'Beginner Windsurf Kit',
    price: 1299.99,
    image: 'https://placehold.co/600x400?text=Beginner+Kit',
    category: 'Boards',
    description: 'Complete starter kit for new windsurfers.',
    brand: 'WindMaster',
    skill: 'Beginner',
    inStock: true
  },
  {
    id: 5,
    name: 'Racing Sail',
    price: 799.99,
    image: 'https://placehold.co/600x400?text=Racing+Sail',
    category: 'Sails',
    description: 'High-speed racing sail for competitive windsurfers.',
    brand: 'SpeedWind',
    skill: 'Advanced',
    inStock: true
  }
];

const categories = ['All', 'Boards', 'Sails', 'Equipment'];
const skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => 
        (selectedCategory === 'All' || product.category === selectedCategory) &&
        (selectedSkillLevel === 'All Levels' || product.skill === selectedSkillLevel) &&
        (searchQuery === '' || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // featured
      });
  }, [selectedCategory, selectedSkillLevel, sortBy, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Windsurf Equipment
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect gear for your windsurfing adventure
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Sorting and Filters */}
            <div className="flex space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skill Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <select
                  value={selectedSkillLevel}
                  onChange={(e) => setSelectedSkillLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  {skillLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-primary-600 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {product.brand} | {product.skill}
                  </span>
                  <Link 
                    to={`/products/${product.id}`} 
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No products found matching your search and filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
