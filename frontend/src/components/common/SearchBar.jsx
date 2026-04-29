import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ placeholder, onSearch, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition"
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;