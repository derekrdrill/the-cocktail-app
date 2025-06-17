'use client';

import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

import { useCocktailStore } from '@/store';
import { SearchBarMenu } from './components/SearchBarMenu';
import { SearchBarChips } from './components/SearchBarChips';
import { SearchBarFilter } from './components/SearchBarFilter';

type SearchBarProps = {
  isHeader?: boolean;
};

export function SearchBar({ isHeader }: SearchBarProps) {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const {
    isSearchMenuOpen,
    isSearchTypeMenuOpen,
    searchQuery,
    selections,
    searchType,
    clearSearchState,
    closeSearchMenu,
    setIsSearchMenuOpen,
    setSearchQuery,
    setActiveSearch,
  } = useCocktailStore();

  const hasSelections = !!selections.length;

  const getPlaceholder = () => {
    if (selections.length > 0 && (searchType === 'Cocktail name' || searchQuery)) {
      return '';
    }

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
    setActiveSearch();
    router.push('/drinks');
    setIsSearchMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsSearchMenuOpen(false);
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
      <div
        className={classNames('flex flex-col gap-2 relative lg:flex-row', {
          // 'lg:flex-row': !isHeader,
        })}
      >
        {/* Container for Search Bar and Selections (always flex-col) */}
        <div className='flex flex-col flex-grow'>
          {/* Main Search Bar */}
          <div
            className={classNames(
              'bg-white border flex items-center shadow-md text-black w-full relative',
              {
                'rounded-lg': !hasSelections,
                'rounded-t-lg': hasSelections,
              },
            )}
          >
            <SearchBarFilter />
            <input
              className={classNames('bg-transparent flex-1 h-12 min-w-[200px] outline-none px-4', {
                'rounded-b-none': isSearchMenuOpen,
              })}
              onChange={e => setSearchQuery(e.target.value)}
              onClick={() => setIsSearchMenuOpen(true)}
              placeholder={getPlaceholder()}
              value={searchQuery}
            />

            {isSearchMenuOpen && !isSearchTypeMenuOpen && <SearchBarMenu />}
          </div>

          {/* Selections Display Area */}
          {selections.length > 0 && (
            <div className='bg-white/95 backdrop-blur-sm border border-gray-200 rounded-b-lg p-3 shadow-sm'>
              <div className='flex items-center justify-between gap-3 mb-2'>
                <span className='text-sm font-medium text-gray-700'>
                  Selected {selections.length === 1 ? 'item' : 'items'}:
                </span>
                <button
                  onClick={() => {
                    clearSearchState();
                    closeSearchMenu();
                  }}
                  className='text-sm text-gray-500 hover:text-gray-700 transition-colors'
                >
                  Clear all
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <SearchBarChips />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className={classNames(
            'bg-yellow-400 hover:bg-yellow-500 px-4 rounded-lg text-black font-medium transition-colors duration-200 flex justify-center items-center gap-2 text-center h-12',
            // {
            //   'lg:h-auto lg:justify-start': !isHeader,
            // },
          )}
        >
          <Search className='h-4 w-4' />
          Search
        </button>
      </div>
    </div>
  );
}
