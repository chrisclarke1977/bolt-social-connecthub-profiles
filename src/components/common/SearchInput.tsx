import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = 'Search...', 
  onSearch,
  className = '',
  debounceMs = 300
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, debounceMs);

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative group ${className}`}
      role="search"
    >
      <motion.div 
        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400"
        animate={{ scale: isFocused ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </motion.div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="input py-2 pl-10 pr-10 w-full rounded-full"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default React.memo(SearchInput);