import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, Users } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { usePropertyContext } from '../context/PropertyContext';

const HomePage = () => {
  const { properties } = usePropertyContext();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover <span className="text-amber-500">Granada</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Experience authentic Andalusian hospitality in our premium vacation rentals. 
            Located in the heart of Granada, steps away from the historic Alhambra.
          </p>
          <Link
            to="/search"
            className="inline-block bg-amber-500 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Properties</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Handpicked accommodations in Granada's most desirable locations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {properties.slice(0, 2).map((property) => (
              <PropertyCard key={property.id} property={property} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RYAP Granada</h2>
            <p className="text-xl text-slate-400">Premium amenities and exceptional service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-slate-400">
                Walking distance to Alhambra, Cathedral, and Granada's historic center
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Amenities</h3>
              <p className="text-slate-400">
                High-speed WiFi, fully equipped kitchens, and premium furnishings
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-slate-400">
                Dedicated concierge service for restaurant recommendations and local tips
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Granada?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Book your stay today and discover the magic of Andalusia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="bg-amber-500 text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="border border-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;