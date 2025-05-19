import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { User } from '../../types';
import { motion } from 'framer-motion';

interface UserCardProps {
  user: User;
  variant?: 'default' | 'compact';
}

const UserCard: React.FC<UserCardProps> = ({ user, variant = 'default' }) => {
  const { id, name, username, avatar, bio, tags } = user;

  if (variant === 'compact') {
    return (
      <motion.div 
        className="card p-4 flex items-center gap-4"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={avatar}
          alt={`${name}'s profile`}
          className="avatar h-12 w-12"
        />
        <div className="min-w-0 flex-1">
          <Link to={`/profile/${id}`} className="no-underline">
            <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
              {name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            @{username}
          </p>
        </div>
        <Link 
          to={`/profile/${id}`}
          className="shrink-0 text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
        >
          <ExternalLink className="h-5 w-5" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="card overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/profile/${id}`} className="block no-underline">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
            <img 
              src={user.coverImage} 
              alt="" 
              className="object-cover w-full h-32"
            />
          </div>
          <div className="absolute -bottom-8 left-4">
            <img
              src={avatar}
              alt={`${name}'s profile`}
              className="avatar h-16 w-16 ring-4 ring-white dark:ring-gray-800"
            />
          </div>
        </div>
        <div className="p-4 mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username}
          </p>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {bio}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="badge badge-primary">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="badge badge-secondary">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default UserCard;