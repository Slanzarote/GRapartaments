import React, { useState } from 'react';
import { 
  Calendar, Users, DollarSign, Star, Settings, 
  Eye, CheckCircle, XCircle, Edit, Trash2
} from 'lucide-react';
import { useBookingContext } from '../context/BookingContext';
import { useAdminContext } from '../context/AdminContext';
import { usePropertyContext } from '../context/PropertyContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { bookings } = useBookingContext();
  const { reviews, approveReview, deleteReview } = useAdminContext();
  const { properties } = usePropertyContext();

  const stats = {
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    occupancyRate: 75,
    averageRating: properties.reduce((sum, p) => sum + p.rating, 0) / properties.length
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'properties', name: 'Properties', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Manage your properties, bookings, and reviews</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-700 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-amber-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{stats.totalBookings}</h3>
                  <p className="text-slate-400">Total Bookings</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">€{stats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-slate-400">Total Revenue</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{stats.occupancyRate}%</h3>
                  <p className="text-slate-400">Occupancy Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-amber-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{stats.averageRating.toFixed(1)}</h3>
                  <p className="text-slate-400">Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <p className="font-medium">{booking.guestName}</p>
                    <p className="text-sm text-slate-400">
                      {booking.checkIn} - {booking.checkOut}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-500">€{booking.totalPrice}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">All Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 font-medium text-slate-400">Guest</th>
                  <th className="pb-3 font-medium text-slate-400">Property</th>
                  <th className="pb-3 font-medium text-slate-400">Dates</th>
                  <th className="pb-3 font-medium text-slate-400">Guests</th>
                  <th className="pb-3 font-medium text-slate-400">Total</th>
                  <th className="pb-3 font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const property = properties.find(p => p.id === booking.propertyId);
                  return (
                    <tr key={booking.id} className="border-b border-slate-700">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{booking.guestName}</p>
                          <p className="text-sm text-slate-400">{booking.guestEmail}</p>
                        </div>
                      </td>
                      <td className="py-4">{property?.title}</td>
                      <td className="py-4">
                        <div className="text-sm">
                          <p>{booking.checkIn}</p>
                          <p>{booking.checkOut}</p>
                        </div>
                      </td>
                      <td className="py-4">{booking.guests}</td>
                      <td className="py-4 font-semibold">€{booking.totalPrice}</td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Review Management</h3>
          <div className="space-y-4">
            {reviews.map((review) => {
              const property = properties.find(p => p.id === review.propertyId);
              return (
                <div key={review.id} className="border border-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-medium mr-2">{review.guestName}</h4>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-amber-500 fill-current' : 'text-slate-400'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-slate-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{property?.title}</p>
                      <p className="text-slate-300">{review.comment}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!review.approved && (
                        <button
                          onClick={() => approveReview(review.id)}
                          className="p-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      review.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.approved ? 'Approved' : 'Pending Approval'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Property Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="border border-slate-700 rounded-lg p-4">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold mb-2">{property.title}</h4>
                <p className="text-slate-400 text-sm mb-2">{property.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 font-semibold">€{property.pricePerNight}/night</span>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span>{property.rating}</span>
                    <span className="text-slate-400">({property.reviewCount})</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex items-center space-x-1 bg-amber-500 text-slate-900 px-3 py-1 rounded text-sm hover:bg-amber-400 transition-colors">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-1 bg-slate-600 text-white px-3 py-1 rounded text-sm hover:bg-slate-500 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;