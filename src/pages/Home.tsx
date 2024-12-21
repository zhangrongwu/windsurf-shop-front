import React from 'react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Windsurf Board Pro X',
    description: 'High-performance windsurf board for advanced riders',
    price: 1299.99,
    image: 'https://placehold.co/600x400?text=Windsurf+Board'
  },
  {
    id: 2,
    name: 'Sail Rider Elite',
    description: 'Lightweight and durable windsurf sail',
    price: 599.99,
    image: 'https://placehold.co/600x400?text=Windsurf+Sail'
  },
  {
    id: 3,
    name: 'Windsurf Starter Kit',
    description: 'Perfect package for beginners',
    price: 1499.99,
    image: 'https://placehold.co/600x400?text=Starter+Kit'
  }
];

function Home() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Ride the Waves with Windsurf Shop
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Discover top-quality windsurfing gear for all skill levels. From beginner to pro, we've got you covered.
              </p>
            </div>
            <div>
              <div className="mt-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://placehold.co/600x400?text=Windsurf+Scene"
                            alt="Windsurf scene"
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://placehold.co/600x400?text=Windsurf+Scene"
                            alt="Windsurf scene"
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/products"
                  className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Featured Products</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Gear Up for Your Next Adventure
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative bg-white p-6 rounded-lg shadow-md">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/product/${product.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
