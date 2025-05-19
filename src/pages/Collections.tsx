import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CollectionCard from '../components/collection/CollectionCard';
import UserCard from '../components/user/UserCard';
import SearchInput from '../components/common/SearchInput';
import { ArrowLeft, Share2, Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collections, getCollectionById, getUsersInCollection, getUserById } from '../data/mockData';
import { Collection } from '../types';
import { motion } from 'framer-motion';

const Collections: React.FC = () => {
  const { collectionId } = useParams<{ collectionId?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(collections);
  
  // Single collection view
  if (collectionId) {
    const collection = getCollectionById(collectionId);
    
    if (!collection) {
      return (
        <Layout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Collection not found</h2>
            <p className="text-gray-600 dark:text-gray-400">The collection you're looking for doesn't exist or has been removed.</p>
            <Link to="/collections" className="mt-6 btn btn-primary inline-block">
              View All Collections
            </Link>
          </div>
        </Layout>
      );
    }
    
    const usersInCollection = getUsersInCollection(collectionId);
    const creator = getUserById(collection.createdBy);
    
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/collections" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Collections
          </Link>
          
          {/* Collection Header */}
          <div className="relative mb-8">
            <div className="h-48 md:h-64 w-full overflow-hidden rounded-xl">
              <img 
                src={collection.coverImage} 
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{collection.name}</h1>
                  {creator && (
                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      Created by {creator.name}
                    </div>
                  )}
                </div>
                
                <div className="flex mt-4 md:mt-0 space-x-3">
                  <button className="btn btn-outline flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {collection.description}
                </p>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center mr-4 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  {collection.userIds.length} {collection.userIds.length === 1 ? 'member' : 'members'}
                </span>
                <span className="mr-4 mb-2">
                  Created on {new Date(collection.createdAt).toLocaleDateString()}
                </span>
                <span className="mb-2">
                  Last updated {new Date(collection.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Collection Members */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Collection Members</h2>
            </div>
            
            {usersInCollection.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {usersInCollection.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">This collection has no members yet.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // Collections list view
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = collections.filter(collection => 
        collection.name.toLowerCase().includes(query) || 
        collection.description.toLowerCase().includes(query)
      );
      setFilteredCollections(filtered);
    } else {
      setFilteredCollections(collections);
    }
  }, [searchQuery]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Collections
          </h1>
          <div className="w-full md:w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <SearchInput 
              placeholder="Search collections..." 
              onSearch={handleSearch}
              className="w-full md:w-64"
            />
            <button className="btn btn-primary flex items-center justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Collection
            </button>
          </div>
        </div>
        
        {filteredCollections.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredCollections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No collections found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search criteria' : 'Create your first collection to get started'}
            </p>
            <button className="btn btn-primary flex items-center mx-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Collection
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Collections;