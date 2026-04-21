import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Calendar, Home, Hotel, Phone, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Rooms', path: '/rooms', icon: Hotel },
    { name: 'About', path: '/about', icon: Hotel },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">R</span>
            </motion.div>
            <div className="text-2xl font-bold">
              <span className="text-primary-600">ROYELLA</span>
              <span className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>RESORT</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path 
                    ? 'text-primary-600' 
                    : isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-600'
                } transition-colors duration-300 font-medium relative group`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname === link.path ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
            
            <Link
              to="/admin"
              className={`hidden md:inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isScrolled
                  ? 'border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-700'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              <LayoutDashboard size={18} />
              Staff console
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition"
                >
                  <User size={18} />
                  <span>{user.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
                    >
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        Staff console
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-600'
                  } transition`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition transform hover:scale-105"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-3 text-gray-700 hover:text-primary-600 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="flex items-center gap-2 py-3 text-gray-700 hover:text-primary-600 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} />
                Staff console
              </Link>
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="block py-3 text-gray-700 hover:text-primary-600 border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-3 text-primary-600 font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-3 text-gray-700 hover:text-primary-600 border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-3 text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;