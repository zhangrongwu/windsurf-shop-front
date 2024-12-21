import React from 'react';
import { 
  BeakerIcon, 
  TrophyIcon, 
  HeartIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const teamMembers = [
  {
    name: 'Sarah Windham',
    role: 'Founder & CEO',
    bio: 'Professional windsurfer with 15 years of experience, passionate about bringing the best gear to enthusiasts.',
    image: 'https://placehold.co/300x300?text=Sarah+Windham'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Head of Product',
    bio: 'Gear expert with a decade of experience in water sports equipment design and selection.',
    image: 'https://placehold.co/300x300?text=Mike+Rodriguez'
  },
  {
    name: 'Emily Chen',
    role: 'Customer Experience Lead',
    bio: 'Dedicated to providing exceptional support and ensuring every customer finds their perfect windsurfing equipment.',
    image: 'https://placehold.co/300x300?text=Emily+Chen'
  }
];

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Ride the Waves with</span>{' '}
                  <span className="block text-primary-600 xl:inline">WindSurf Shop</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We're more than just a store. We're a community of passionate windsurfers dedicated to bringing you the best gear, 
                  expert advice, and unparalleled customer experience.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://placehold.co/1200x800?text=Windsurfing+Action"
            alt="Windsurfing action"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Windsurfers Worldwide
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <BeakerIcon className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Constantly exploring cutting-edge windsurfing technologies and equipment.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <TrophyIcon className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Quality</h3>
                <p className="mt-2 text-base text-gray-500">
                  Curating only the highest quality gear from top manufacturers.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HeartIcon className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Passion</h3>
                <p className="mt-2 text-base text-gray-500">
                  Driven by our love for windsurfing and the ocean.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <GlobeAltIcon className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Community</h3>
                <p className="mt-2 text-base text-gray-500">
                  Building a global community of windsurfing enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Experts Behind WindSurf Shop
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                  src={member.image}
                  alt={member.name}
                />
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-base text-primary-600">{member.role}</p>
                  <p className="mt-2 text-base text-gray-500">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
