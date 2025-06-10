'use client';

import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import { useSearchBarStore } from '@/store';
import { SearchBarMenu } from './components/SearchBarMenu';
import { SearchBarChips } from './components/SearchBarChips';
import { SearchBarFilter } from './components/SearchBarFilter';

export function SearchBar() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const {
    isMenuOpen,
    isSearchTypeMenuOpen,
    searchQuery,
    selections,
    searchType,
    setIsMenuOpen,
    setSearchQuery,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        </div>
        {isMenuOpen && !isSearchTypeMenuOpen && <SearchBarMenu />}
      </div>
    </div>
  );
}
