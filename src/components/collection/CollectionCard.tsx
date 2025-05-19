import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Collection } from '../../types';
import { getUserById } from '../../data/mockData';
import { motion } from 'framer-motion';

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const { id, name, description, createdBy, coverImage, userIds } = collection;
  const creator = getUserById(createdBy);

  return (
    <motion.div 
      className="card overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/collections/${id}`} className="block no-underline">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
            <img 
              src={coverImage} 
              alt={name} 
              className="object-cover w-full h-40"
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center text-xs font-medium text-gray-700 dark:text-gray-300">
            <Users className="h-3 w-3 mr-1" />
            {userIds.length}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {name}
          </h3>
          {creator && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              by {creator.name}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;