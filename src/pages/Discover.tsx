import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import UserCard from '../components/user/UserCard';
import SearchInput from '../components/common/SearchInput';
import { Filter } from 'lucide-react';
import { users } from '../data/mockData';
import { User } from '../types';

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Get all unique tags from users
  const allTags = Array.from(
    new Set(users.flatMap(user => user.tags))
  ).sort();

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter users based on search query and selected tags
  useEffect(() => {
    let result = users;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.username.toLowerCase().includes(query) || 
        user.bio.toLowerCase().includes(query) ||
        user.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter(user => 
        selectedTags.every(tag => user.tags.includes(tag))
      );
    }
    
    setFilteredUsers(result);
  }, [searchQuery, selectedTags]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Discover People
          </h1>
          <div className="w-full md:w-auto">
            <SearchInput 
              placeholder="Search by name, username, or tag..." 
              onSearch={handleSearch}
              className="w-full md:w-64 lg:w-80"
            />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {allTags.map(tag => (
                    <label 
                      key={tag} 
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedTags.includes(tag)} 
                        onChange={() => toggleTag(tag)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {selectedTags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => setSelectedTags([])} 
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* User Grid */}
          <div className="flex-1">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;