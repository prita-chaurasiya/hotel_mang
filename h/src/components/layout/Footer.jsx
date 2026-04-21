import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Contact', path: '/contact' },
    { name: 'Guest dashboard', path: '/dashboard' },
    { name: 'Staff console', path: '/admin' },
  ];

  const contactInfo = [
    { icon: MapPin, text: '123 Luxury Avenue, Beverly Hills, CA 90210' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: Mail, text: 'info@royellaresort.com' },
    { icon: Clock, text: '24/7 Customer Support' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', color: 'hover:text-blue-600', emoji: '📘' },
    { name: 'Twitter', href: '#', color: 'hover:text-blue-400', emoji: '🐦' },
    { name: 'Instagram', href: '#', color: 'hover:text-pink-600', emoji: '📷' },
    { name: 'YouTube', href: '#', color: 'hover:text-red-600', emoji: '📺' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary-600">ROYELLA</span> RESORT
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Experience luxury and comfort at its finest. Creating unforgettable memories since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-300 ${social.color} hover:scale-110 transform text-2xl`}
                  aria-label={social.name}
                >
                  {social.emoji}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3 text-gray-400">
                  <info.icon size={18} className="mt-1 flex-shrink-0 text-primary-600" />
                  <span className="hover:text-white transition-colors duration-300">{info.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates</p>
            <form 
              className="space-y-3" 
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]')?.value;
                if (email) {
                  alert(`Thanks for subscribing! You'll receive updates at ${email}`);
                  e.target.reset();
                }
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-600 text-white transition-colors duration-300"
              />
              <button 
                type="submit"
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105 transform"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-2">No spam, unsubscribe anytime.</p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Royella Resort. All rights reserved. | Designed with ❤️ for luxury travel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;