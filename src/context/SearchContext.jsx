import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); 

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const value = {
    isSearchOpen,
    toggleSearch,
    setIsSearchOpen,
    closeSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
