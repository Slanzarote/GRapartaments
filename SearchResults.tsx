import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { properties } = usePropertyContext();
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    guests: 1,
    bedrooms: 0,
    amenities: {
      wifi: false,
      parking: false,
      kitchen: false,
      airConditioning: false
    }
  });
  const [showFilters, setShowFilters] = useState(false);

  const query = searchParams.get('q') || '';

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Text search
      const matchesQuery = query === '' || 
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase());

      // Price filter
      const matchesPrice = property.pricePerNight >= filters.minPrice && 
        property.pricePerNight <= filters.maxPrice;

      // Guests filter
      const matchesGuests = property.maxGuests >= filters.guests;

      // Bedrooms filter
      const matchesBedrooms = filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;

      // Amenities filter
      const matchesAmenities = Object.entries(filters.amenities).every(([amenity, required]) => {
        if (!required) return true;
        return property.amenities[amenity as keyof typeof property.amenities];
      });

      return matchesQuery && matchesPrice && matchesGuests && matchesBedrooms && matchesAmenities;
    });
  }, [properties, query, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {query ? `Search results for "${query}"` : 'All Properties'}
          </h1>
          <p className="text-slate-400">{filteredProperties.length} properties found</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-slate-800 rounded-lg p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Price Range (per night)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 500 })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Guests
              </label>
              <select
                value={filters.guests}
                onChange={(e) => setFilters({ ...filters, guests: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
              >
                <option value={0}>Any</option>
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>
                    {num}+ bedroom{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Amenities
              </label>
              <div className="space-y-2">
                {Object.entries(filters.amenities).map(([amenity, checked]) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setFilters({
                        ...filters,
                        amenities: {
                          ...filters.amenities,
                          [amenity]: e.target.checked
                        }
                      })}
                      className="mr-2 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500 focus:ring-2"
                    />
                    <span className="text-slate-300 capitalize">
                      {amenity.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                minPrice: 0,
                maxPrice: 500,
                guests: 1,
                bedrooms: 0,
                amenities: {
                  wifi: false,
                  parking: false,
                  kitchen: false,
                  airConditioning: false
                }
              })}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-slate-400">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;