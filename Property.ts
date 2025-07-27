export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  amenities: {
    wifi: boolean;
    parking: boolean;
    kitchen: boolean;
    airConditioning: boolean;
    heating: boolean;
    washer: boolean;
    tv: boolean;
    balcony: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  availability: { [date: string]: boolean };
  seasonalPricing: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}