import React from 'react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Pro Windsurf Board',
    price: 999.99,
    image: 'https://placehold.co/600x400',
    category: 'Boards',
  },
  {
    id: 2,
    name: 'Performance Sail',
    price: 599.99,
    image: 'https://placehold.co/600x400',
    category: 'Sails',
  },
  {
    id: 3,
    name: 'Carbon Mast',
    price: 299.99,
    image: 'https://placehold.co/600x400',
    category: 'Equipment',
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://placehold.co/1920x600"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium Windsurfing Gear
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Discover our collection of high-quality windsurfing equipment for all skill levels.
            From beginner boards to professional gear, we have everything you need to ride the waves.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 rounded-md transition duration-150"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Free Shipping',
                description: 'On orders over $500',
                icon: '🚚',
              },
              {
                title: 'Expert Support',
                description: 'Available 7 days a week',
                icon: '👨‍💼',
              },
              {
                title: 'Secure Payment',
                description: '100% secure checkout',
                icon: '🔒',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
