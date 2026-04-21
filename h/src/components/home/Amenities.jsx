import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, Coffee, Utensils, Dumbbell,
  Car, Waves, Wine, Shield,
  Wind, Sparkles, ConciergeBell, ParkingCircle
} from 'lucide-react';
import { amenityHighlights as fallbackHighlights } from '../../constants/images';
import { getHomePage } from '../../services/contentService';

const Amenities = () => {
  const [highlights, setHighlights] = useState(fallbackHighlights);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const home = await getHomePage();
        if (!cancelled && home.amenityHighlights?.length) {
          setHighlights(home.amenityHighlights);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const amenities = [
    { icon: Wifi, name: 'Free Wi-Fi', description: 'High-speed internet throughout the resort' },
    { icon: Coffee, name: 'Breakfast Buffet', description: 'Complimentary gourmet breakfast' },
    { icon: Utensils, name: 'Fine Dining', description: 'World-class restaurants' },
    { icon: Dumbbell, name: 'Fitness Center', description: 'State-of-the-art equipment' },
    { icon: Waves, name: 'Swimming Pool', description: 'Infinity pool with ocean view' },
    { icon: Wine, name: 'Wine Cellar', description: 'Premium wine collection' },
    { icon: Shield, name: '24/7 Security', description: 'Round-the-clock security' },
    { icon: ConciergeBell, name: 'Concierge', description: 'Personal butler service' },
    { icon: Car, name: 'Airport Transfer', description: 'Luxury car service' },
    { icon: Wind, name: 'Spa & Wellness', description: 'Relaxing spa treatments' },
    { icon: Sparkles, name: 'Room Service', description: '24/7 in-room dining' },
    { icon: ParkingCircle, name: 'Free Parking', description: 'Valet parking available' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
            World-Class Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for a perfect stay
          </p>
        </motion.div>

        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-playfair text-lg font-bold">{item.title}</p>
                <p className="text-sm text-white/85">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                <amenity.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.name}</h3>
              <p className="text-gray-600 text-sm">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
