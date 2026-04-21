import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomSearch = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('');

  const roomTypes = [
    'All Rooms',
    'Presidential Suite',
    'Deluxe Ocean View',
    'Executive Room',
    'Family Suite',
    'Standard Room',
  ];

  const toYmd = (d) => d.toISOString().slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('checkIn', toYmd(checkIn));
    params.set('checkOut', toYmd(checkOut));
    params.set('guests', String(guests));
    if (roomType && roomType !== 'All Rooms') {
      params.set('type', roomType);
    }
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-2xl md:p-8"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">Check In</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={18} />
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
        </div>

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">Check Out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={18} />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
              dateFormat="dd/MM/yyyy"
              minDate={checkIn}
            />
          </div>
        </div>

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">Room Type</label>
          <div className="relative">
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 py-3 pl-4 pr-10 focus:border-transparent focus:ring-2 focus:ring-primary-500"
            >
              {roomTypes.map((type, index) => (
                <option key={type} value={index === 0 ? '' : type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={18} />
          </div>
        </div>

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={18} />
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">&nbsp;</label>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-white transition hover:bg-primary-700"
          >
            <Search size={18} className="transition group-hover:scale-110" />
            Check Availability
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default RoomSearch;
