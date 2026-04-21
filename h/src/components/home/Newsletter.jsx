import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Gift } from 'lucide-react';
import toast from 'react-hot-toast';
import { hotelImages } from '../../constants/images';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Subscribed successfully! Check your email for exclusive offers.');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden py-20">
      <img
        src={hotelImages.newsletterBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/88 to-gray-800/85" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 shadow-lg animate-pulse">
              <Gift size={32} className="text-white" />
            </div>
          </div>

          <h2 className="mb-4 font-playfair text-3xl font-bold text-white md:text-4xl">
            Get Exclusive Offers
          </h2>
          <p className="mb-8 text-xl text-gray-200">
            Subscribe to our newsletter and get 20% off on your first booking
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-4 font-semibold text-white transition hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : (
                <>
                  Subscribe Now
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            No spam, unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
