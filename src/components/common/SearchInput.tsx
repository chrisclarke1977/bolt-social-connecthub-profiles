import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = 'Search...', 
  onSearch,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative group ${className}`}
    >
      <motion.div 
        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400`}
        animate={{ scale: isFocused ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Search className="h-5 w-5" />
      </motion.div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="input py-2 pl-10 pr-10 w-full rounded-full"
        placeholder={placeholder}
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default SearchInput;