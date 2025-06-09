'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { useSearchBarStore } from '../store';
import { SearchType } from '../types';

export function SearchBarFilter() {
  const searchBarFilterRef = useRef<HTMLDivElement>(null);
  const {
    isSearchTypeMenuOpen,
    searchType,
    setIsSearchTypeMenuOpen,
    setSearchType,
    setSearchQuery,
    setSelections,
  } = useSearchBarStore();

  const handleOptionClick = (newSearchType: SearchType) => {
    if (newSearchType !== searchType) {
      setSearchQuery('');
      setSelections([]);
    }
    setSearchType(newSearchType);
    setIsSearchTypeMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarFilterRef.current &&
        !searchBarFilterRef.current.contains(event.target as Node)
      ) {
        setIsSearchTypeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={searchBarFilterRef}>
      <button
        onClick={() => setIsSearchTypeMenuOpen(!isSearchTypeMenuOpen)}
        className='bg-gray-100 border border-gray-200 flex flex-col h-11 px-2 rounded-l-lg text-gray-700 text-sm w-40'
      >
        <span className='flex text-xs'>Search by</span>
        <div className='flex justify-between'>
          {searchType}
          {isSearchTypeMenuOpen ? (
            <ChevronUp className='h-4 w-4' />
          ) : (
            <ChevronDown className='h-4 w-4' />
          )}
        </div>
      </button>
      {isSearchTypeMenuOpen && (
        <div className='absolute bg-white border mt-1 p-1 rounded-lg shadow-lg w-full z-10'>
          <button
            onClick={() => handleOptionClick('All')}
            className={classNames(
              'hover:bg-gray-100 px-2 py-1.5 rounded text-left text-sm w-full',
              { 'bg-gray-100': searchType === 'All' },
            )}
          >
            All
          </button>
          <button
            onClick={() => handleOptionClick('Cocktail name')}
            className={classNames(
              'hover:bg-gray-100 px-2 py-1.5 rounded text-left text-sm w-full',
              { 'bg-gray-100': searchType === 'Cocktail name' },
            )}
          >
            Cocktail name
          </button>
          <button
            onClick={() => handleOptionClick('Glass types')}
            className={classNames(
              'hover:bg-gray-100 px-2 py-1.5 rounded text-left text-sm w-full',
              { 'bg-gray-100': searchType === 'Glass types' },
            )}
          >
            Glass types
          </button>
          <button
            onClick={() => handleOptionClick('Ingredients')}
            className={classNames(
              'hover:bg-gray-100 px-2 py-1.5 rounded text-left text-sm w-full',
              { 'bg-gray-100': searchType === 'Ingredients' },
            )}
          >
            Ingredients
          </button>
        </div>
      )}
    </div>
  );
}
