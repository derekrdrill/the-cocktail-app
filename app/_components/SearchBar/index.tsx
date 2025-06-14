'use client';

import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import { useSearchBarStore } from '@/store';
import { SearchBarMenu } from './components/SearchBarMenu';
import { SearchBarChips } from './components/SearchBarChips';
import { SearchBarFilter } from './components/SearchBarFilter';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const {
    isMenuOpen,
    isSearchTypeMenuOpen,
    searchQuery,
    selections,
    searchType,
    setIsMenuOpen,
    setSearchQuery,
    setActiveSearch,
  } = useSearchBarStore();

  const getPlaceholder = () => {
    if (selections.length > 0) return '';

    switch (searchType) {
      case 'Cocktail name':
        return 'Search cocktail names...';
      case 'Glass types':
        return 'Search glass types...';
      case 'Ingredients':
        return 'Search ingredients...';
      default:
        return 'Search cocktails, glasses, or ingredients...';
    }
  };

  const handleSearch = () => {
    // Validate search criteria based on search type
    if (searchType === 'Cocktail name' && !searchQuery) {
      return; // Don't search if no query for cocktail name search
    }

    if (searchType === 'Glass types' && !selections.some(s => s.type === 'glass')) {
      return; // Don't search if no glass type selected
    }

    if (searchType === 'Ingredients' && !selections.some(s => s.type === 'ingredient')) {
      return; // Don't search if no ingredients selected
    }

    // Set active search before navigating
    setActiveSearch();

    // Navigate to results page
    router.push('/drinks');

    // Close the menu after search
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle enter key press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isSearchTypeMenuOpen) {
        handleSearch();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [searchType, searchQuery, selections, isSearchTypeMenuOpen]);

  return (
    <div className='container max-w-4xl mx-auto py-8 relative z-50' ref={searchBarRef}>
      <div className='relative'>
        <div className='bg-white border flex flex-wrap gap-2 h-12 items-center pr-4 rounded-lg shadow-md text-black w-full'>
          <SearchBarFilter />
          <SearchBarChips />
          <input
            className={classNames('bg-transparent flex-1 h-full min-w-[200px] outline-none', {
              'rounded-b-none': isMenuOpen,
            })}
            onChange={e => setSearchQuery(e.target.value)}
            onClick={() => setIsMenuOpen(true)}
            placeholder={getPlaceholder()}
            value={searchQuery}
          />
          <button
            onClick={handleSearch}
            className='bg-yellow-400 hover:bg-yellow-500 h-8 px-4 rounded-lg text-black font-medium transition-colors duration-200 flex items-center gap-2'
          >
            <Search className='h-4 w-4' />
            Search
          </button>
        </div>
        {isMenuOpen && !isSearchTypeMenuOpen && <SearchBarMenu />}
      </div>
    </div>
  );
}
