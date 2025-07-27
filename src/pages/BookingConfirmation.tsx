import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone } from 'lucide-react';
import { useBookingContext } from '../context/BookingContext';
import { usePropertyContext } from '../context/PropertyContext';

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { getBooking } = useBookingContext();
  const { getProperty } = usePropertyContext();

  const booking = getBooking(id!);
  const property = booking ? getProperty(booking.propertyId) : null;

  if (!booking || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Link
            to="/"
            className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-green-400">Booking Confirmed!</h1>
        <p className="text-xl text-slate-400">
          Your reservation has been successfully confirmed. We can't wait to welcome you to Granada!
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Info */}
          <div>
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
            <div className="flex items-center text-slate-400 mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Booking Info */}
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Reservation ID</h4>
              <p className="text-amber-500 font-mono">{booking.id.toUpperCase()}</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Guest Information</h4>
              <p>{booking.guestName}</p>
              <p className="text-slate-400">{booking.guestEmail}</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                <h4 className="font-semibold">Dates</h4>
              </div>
              <p>Check-in: <span className="font-semibold">{booking.checkIn}</span></p>
              <p>Check-out: <span className="font-semibold">{booking.checkOut}</span></p>
              <p className="text-slate-400 text-sm">{nights} nights</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 mr-2 text-amber-500" />
                <h4 className="font-semibold">Guests</h4>
              </div>
              <p>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <h4 className="font-semibold mb-4">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>€{property.pricePerNight} × {nights} nights</span>
              <span>€{nights * property.pricePerNight}</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning fee</span>
              <span>€25</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>€{Math.round(nights * property.pricePerNight * 0.1)}</span>
            </div>
            <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-amber-500">€{booking.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Check-in Information</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Check-in: 3:00 PM - 10:00 PM</li>
            <li>• Electronic key code will be sent 24 hours before arrival</li>
            <li>• Property address will be provided in your confirmation email</li>
            <li>• Late check-in available with prior notice</li>
          </ul>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">What to Bring</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Valid photo ID for all guests</li>
            <li>• Credit card used for booking</li>
            <li>• Confirmation email (printed or digital)</li>
            <li>• Personal toiletries and medications</li>
          </ul>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-semibold mb-6">Need Assistance?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Phone className="h-6 w-6 text-amber-500" />
            <div>
              <p className="font-semibold">General Support</p>
              <p className="text-slate-400">+34 123 456 789</p>
              <p className="text-sm text-slate-500">Mon-Sun: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-6 w-6 text-red-500" />
            <div>
              <p className="font-semibold">Emergency Line</p>
              <p className="text-slate-400">+34 987 654 321</p>
              <p className="text-sm text-slate-500">Available 24/7</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-amber-500" />
            <div>
              <p className="font-semibold">Email Support</p>
              <p className="text-slate-400">info@ryapgranada.com</p>
              <p className="text-sm text-slate-500">Response within 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Print Confirmation
          </button>
          <Link
            to="/contact"
            className="border border-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-slate-400 text-sm">
          A confirmation email has been sent to {booking.guestEmail}
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;