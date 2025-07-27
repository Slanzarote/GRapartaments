import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Coffee, AirVent, Thermometer, Hash as Washer, Tv, Wind, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { useBookingContext } from '../context/BookingContext';
import { useAdminContext } from '../context/AdminContext';
import BookingForm from '../components/BookingForm';
import ReviewSection from '../components/ReviewSection';
import PropertyMap from '../components/PropertyMap';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProperty } = usePropertyContext();
  const { reviews } = useAdminContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const property = getProperty(id!);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const propertyReviews = reviews.filter(review => 
    review.propertyId === property.id && review.approved
  );

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    kitchen: Coffee,
    airConditioning: AirVent,
    heating: Thermometer,
    washer: Washer,
    tv: Tv,
    balcony: Wind
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-amber-500 fill-current" />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-slate-400">({property.reviewCount} reviews)</span>
          </div>
        </div>
        <div className="flex items-center text-slate-400">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-96">
          <div 
            className="lg:col-span-2 lg:row-span-2 relative cursor-pointer group"
            onClick={() => setIsGalleryOpen(true)}
          >
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div 
              key={index}
              className="relative cursor-pointer group"
              onClick={() => setIsGalleryOpen(true)}
            >
              <img
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property Info */}
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-amber-500" />
                <span>{property.maxGuests} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bed className="h-5 w-5 text-amber-500" />
                <span>{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="h-5 w-5 text-amber-500" />
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(property.amenities).map(([amenity, available]) => {
                if (!available) return null;
                const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                return (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-amber-500" />
                    <span className="capitalize">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <PropertyMap property={property} />
          </div>

          {/* Reviews */}
          <ReviewSection property={property} reviews={propertyReviews} />
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm property={property} />
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.title} ${currentImageIndex + 1}`}
                className="w-full h-96 md:h-[500px] object-cover rounded-lg"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex justify-center mt-4 space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-amber-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;