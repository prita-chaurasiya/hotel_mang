import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Bed, Star, ArrowRight, Wifi, Coffee, Bath } from 'lucide-react';
import { roomPhotos } from '../../constants/images';

const fallbackRoomImg = roomPhotos.presidential;

const RoomCard = ({ room, viewMode = 'grid', index = 0 }) => {
  const amenities = [
    { icon: Wifi, name: 'Free WiFi' },
    { icon: Coffee, name: 'Breakfast' },
    { icon: Bath, name: 'Private Bath' }
  ];

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative overflow-hidden">
            <img 
              src={room.image || fallbackRoomImg} 
              alt={room.name}
              loading="lazy"
              decoding="async"
              className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ${room.price}/night
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{room.rating || 4.5}</span>
                    <span className="text-gray-500">({room.reviews || 50} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{room.capacity || 2} Guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed size={16} />
                <span>{room.beds || 'Queen Bed'}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {room.description || `Experience luxury and comfort in our ${room.name}. Perfect for ${room.capacity || 2} guests with premium amenities.`}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.map((amenity, idx) => (
                <span key={idx} className="flex items-center gap-1 text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  <amenity.icon size={14} />
                  {amenity.name}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <span className="text-3xl font-bold text-primary-600">${room.price}</span>
                <span className="text-gray-500">/night</span>
                {room.originalPrice && (
                  <span className="text-gray-400 line-through ml-2">${room.originalPrice}</span>
                )}
              </div>
              <Link
                to={`/rooms/${room.id}`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all group"
              >
                Book Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={room.image || fallbackRoomImg} 
          alt={room.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${room.price}/night
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-6">
          <Link
            to={`/rooms/${room.id}`}
            className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition"
          >
            Quick View
          </Link>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold">{room.rating || 4.5}</span>
              <span className="text-xs text-gray-500">({room.reviews || 50})</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{room.capacity || 2}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed size={14} />
            <span>{room.beds || 'Queen'}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {amenities.slice(0, 2).map((amenity, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
              <amenity.icon size={12} />
              {amenity.name}
            </span>
          ))}
        </div>
        
        <Link
          to={`/rooms/${room.id}`}
          className="mt-2 inline-flex items-center justify-center w-full gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all group"
        >
          Book Now
          <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;