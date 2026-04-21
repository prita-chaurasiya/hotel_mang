import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Globe } from 'lucide-react';
import { hotelImages } from '../constants/images';

const About = () => {
  const stats = [
    { icon: Award, value: '10+', label: 'Years of Excellence' },
    { icon: Users, value: '50k+', label: 'Happy Guests' },
    { icon: Clock, value: '24/7', label: 'Customer Support' },
    { icon: Globe, value: '50+', label: 'Awards Won' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Royella Resort</title>
      </Helmet>

      <div className="pt-24">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={hotelImages.hero}
            alt="About Royella Resort"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center font-playfair">
              About Royella Resort
            </h1>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 font-playfair">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2014, Royella Resort has been synonymous with luxury, comfort, and exceptional hospitality. Nestled along the pristine coastline, our resort offers a perfect blend of modern amenities and natural beauty.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a dream to create a sanctuary for travelers has evolved into one of the most sought-after destinations for luxury seekers from around the world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to uphold our commitment to providing unforgettable experiences, personalized service, and creating cherished memories for every guest who walks through our doors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src={hotelImages.lobby}
                alt="Resort lobby and reception"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary-600 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <stat.icon size={48} className="mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <img 
                src={hotelImages.pool}
                alt="Resort pool"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-4xl font-bold mb-6 font-playfair">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                To provide unparalleled luxury experiences that exceed expectations, creating lasting memories for our guests while maintaining the highest standards of service and sustainability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to preserving the natural beauty of our surroundings and contributing positively to the local community, ensuring that luxury and responsibility go hand in hand.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About; // ✅ This is important!