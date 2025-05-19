import React from 'react';
import Layout from '../components/layout/Layout';
import UserCard from '../components/user/UserCard';
import CollectionCard from '../components/collection/CollectionCard';
import SearchInput from '../components/common/SearchInput';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { users, collections } from '../data/mockData';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would trigger a search
  };

  const featuredUsers = users.slice(0, 3);
  const featuredCollections = collections.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] mix-blend-overlay opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Connect, Share, Discover
            </motion.h1>
            <motion.p 
              className="text-xl text-primary-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Create your professional profile, share your social links, and discover amazing people in curated collections.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/profile" className="btn btn-primary">
                Create Your Profile
              </Link>
              <Link to="/discover" className="btn btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20">
                Explore Profiles
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <SearchInput 
              placeholder="Search for users, collections, or tags..." 
              onSearch={handleSearch} 
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Users */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Profiles
            </h2>
            <Link to="/discover" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Popular Collections
            </h2>
            <Link to="/collections" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCollections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-50 dark:bg-primary-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 dark:text-primary-300 mb-4">
            Ready to join our community?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your profile today and connect with amazing professionals from around the world.
          </p>
          <Link to="/profile" className="btn btn-primary">
            Get Started Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;