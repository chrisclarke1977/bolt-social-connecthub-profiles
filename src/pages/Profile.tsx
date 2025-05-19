import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SocialLinks from '../components/common/SocialLinks';
import CollectionCard from '../components/collection/CollectionCard';
import { Share2, MapPin, Calendar, Edit, Plus } from 'lucide-react';
import { getUserById, getCollectionsByUser } from '../data/mockData';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  // For demo, we'll use the first user as the default if no ID is provided
  const user = getUserById(userId || '1');
  const [activeTab, setActiveTab] = useState<'about' | 'collections'>('about');
  
  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User not found</h2>
          <p className="text-gray-600 dark:text-gray-400">The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  const userCollections = getCollectionsByUser(user.id);
  const isOwnProfile = !userId || userId === '1'; // In a real app, this would check against the authenticated user

  return (
    <Layout>
      {/* Profile Header */}
      <div className="relative bg-gray-200 dark:bg-gray-800">
        <div className="h-48 md:h-72 w-full overflow-hidden">
          <img 
            src={user.coverImage} 
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row -mt-16 md:-mt-24">
          {/* Profile Picture */}
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <motion.div 
              className="rounded-full overflow-hidden border-4 border-white dark:border-gray-900 w-32 h-32 md:w-40 md:h-40 relative z-10 bg-white dark:bg-gray-800"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          {/* Profile Info */}
          <div className="md:ml-6 md:mt-16 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-3">
                {isOwnProfile ? (
                  <button className="btn btn-outline flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <button className="btn btn-outline flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
              
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center mr-4 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag, index) => (
                    <span key={index} className="badge badge-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <SocialLinks links={user.socialLinks} size="md" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'collections'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('collections')}
              >
                Collections
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'about' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About {user.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {user.bio}
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Social Links</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <ul className="space-y-4">
                    {user.socialLinks.map((link, index) => (
                      <li key={index} className="flex items-center">
                        <SocialLinks links={[link]} size="sm" />
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {link.username || link.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'collections' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Collections</h2>
                {isOwnProfile && (
                  <button className="btn btn-outline flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Collection
                  </button>
                )}
              </div>
              
              {userCollections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCollections.map(collection => (
                    <CollectionCard key={collection.id} collection={collection} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400">No collections found.</p>
                  {isOwnProfile && (
                    <button className="mt-4 btn btn-primary flex items-center mx-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Collection
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;