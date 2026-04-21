import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Bed, ArrowRight, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedRooms } from '../../services/contentService';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedRooms, setLikedRooms] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getFeaturedRooms(3);
        if (!cancelled) setRooms(list);
      } catch {
        if (!cancelled) setRooms([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleLike = (roomId) => {
    if (likedRooms.includes(roomId)) {
      setLikedRooms(likedRooms.filter((id) => id !== roomId));
    } else {
      setLikedRooms([...likedRooms, roomId]);
    }
  };

  const amenityTags = (room) => room.amenitiesShort || room.amenities || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
            Our Luxury Rooms
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience ultimate comfort in our beautifully designed rooms and suites
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={room.image || room.images?.[0]}
                    alt={room.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {room.badge && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {room.badge}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleLike(room.id)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
                  >
                    <Heart
                      size={18}
                      className={likedRooms.includes(room.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                    />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-6">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{room.name}</h3>
                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                      <Star size={14} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-semibold">{room.rating}</span>
                      <span className="text-xs text-gray-600">({room.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span className="text-sm">{room.capacity} Guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span className="text-sm">{room.beds}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {amenityTags(room)
                      .slice(0, 4)
                      .map((amenity, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">${room.price}</span>
                      <span className="text-sm text-gray-600 ml-1">/night</span>
                      {room.originalPrice && (
                        <span className="ml-2 text-gray-400 line-through">${room.originalPrice}</span>
                      )}
                    </div>
                    <Link
                      to={`/rooms/${room.id}`}
                      className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition group"
                    >
                      Book Now
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
