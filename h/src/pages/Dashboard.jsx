import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, CreditCard, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hotelImages, roomPhotos } from '../constants/images';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { icon: Calendar, label: 'Total Bookings', value: '3', color: 'bg-blue-500' },
    { icon: CreditCard, label: 'Total Spent', value: '$1,247', color: 'bg-green-500' },
    { icon: User, label: 'Loyalty Points', value: '2,500', color: 'bg-purple-500' },
  ];

  const recentBookings = [
    { id: 1, room: 'Deluxe Ocean View', date: 'Dec 15-20, 2024', status: 'Confirmed', amount: '$1,745', image: roomPhotos.deluxeOcean },
    { id: 2, room: 'Executive Room', date: 'Jan 5-10, 2025', status: 'Pending', amount: '$1,245', image: roomPhotos.executive },
    { id: 3, room: 'Presidential Suite', date: 'Feb 1-5, 2025', status: 'Confirmed', amount: '$2,995', image: roomPhotos.presidential },
  ];

  return (
    <>
      <Helmet>
        <title>My Dashboard - Royella Resort</title>
      </Helmet>

      <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            <img
              src={hotelImages.dashboardWelcome}
              alt=""
              className="h-48 w-full object-cover sm:h-56"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/85" />
            <div className="relative z-10 p-8 text-white">
              <h1 className="mb-2 text-3xl font-bold">Welcome back, {user?.name || 'Guest'}!</h1>
              <p className="text-primary-100">Manage your bookings and account settings here.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <h3 className="text-gray-600">{stat.label}</h3>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Bookings</h2>
              <Link to="/bookings" className="text-primary-600 hover:text-primary-700 text-sm">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between gap-4 p-4 border rounded-lg hover:shadow-md transition">
                  <div className="flex min-w-0 items-center gap-4">
                    <img
                      src={booking.image}
                      alt=""
                      className="h-14 w-20 shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">{booking.room}</h3>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{booking.amount}</p>
                    <span className={`text-sm px-2 py-1 rounded ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">Contact our 24/7 customer support for assistance</p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                Contact Support
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Special Offers</h3>
              <p className="text-gray-600 mb-4">Get 20% off on your next booking with promo code: WELCOME20</p>
              <Link to="/rooms" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Book Now
              </Link>
            </div>
          </div>

          {/* Account Settings Link */}
          <div className="mt-8 text-center">
            <button 
              onClick={logout}
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; // ✅ This is required!