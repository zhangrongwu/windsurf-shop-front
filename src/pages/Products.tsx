import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
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
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
            Windsurf Equipment
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect gear for your windsurfing adventure
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col justify-between items-center space-y-4 md:flex-row md:space-y-0">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Sorting and Filters */}
            <div className="flex space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 text-white rounded-md bg-primary-600 hover:bg-primary-700"
              >
                <FunnelIcon className="mr-2 w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
              {/* Category Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 w-full rounded-md border border-gray-300"
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Skill Level
                </label>
                <select
                  value={selectedSkillLevel}
                  onChange={(e) => setSelectedSkillLevel(e.target.value)}
                  className="px-4 py-2 w-full rounded-md border border-gray-300"
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="overflow-hidden bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-64"
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs text-white bg-red-500 rounded-md">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {product.brand} | {product.skill}
                  </span>
                  <Link 
                    to={`/products/${product.id}`} 
                    className="font-medium text-primary-600 hover:text-primary-800"
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
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">
              No products found matching your search and filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
