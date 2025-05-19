import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Users, PlusCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                ConnectHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/discover') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Discover
            </Link>
            <Link
              to="/collections"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/collections') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Collections
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/profile') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              Profile
            </Link>
            <button 
              className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/discover') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={closeMenu}
            >
              Discover
            </Link>
            <Link
              to="/collections"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/collections') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={closeMenu}
            >
              Collections
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/profile') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={closeMenu}
            >
              Profile
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;