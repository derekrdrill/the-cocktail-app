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
    // if (searchType === 'Cocktail name' && !searchQuery) {
    //   return;
    // }

    // if (searchType === 'Glass types' && !selections.some(s => s.type === 'glass')) {
    //   return;
    // }

    // if (searchType === 'Ingredients' && !selections.some(s => s.type === 'ingredient')) {
    //   return;
    // }

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
        className={classNames('flex flex-col gap-2 relative ', {
          'lg:flex-row': !isHeader,
        })}
      >
        <div className='bg-white border flex flex-wrap gap-2 h-12 items-center pr-4 rounded-lg shadow-md text-black w-full'>
          <SearchBarFilter />
          <SearchBarChips />
          <input
            className={classNames('bg-transparent flex-1 h-full min-w-[200px] outline-none', {
              'rounded-b-none': isSearchMenuOpen,
            })}
            onChange={e => setSearchQuery(e.target.value)}
            onClick={() => setIsSearchMenuOpen(true)}
            placeholder={getPlaceholder()}
            value={searchQuery}
          />
          {!!((searchQuery || selections.length) && searchType) && (
            <button
              onClick={() => {
                clearSearchState();
                closeSearchMenu();
              }}
            >
              <X />
            </button>
          )}

          {isSearchMenuOpen && !isSearchTypeMenuOpen && <SearchBarMenu />}
        </div>
        <button
          onClick={handleSearch}
          className={classNames(
            'bg-yellow-400 hover:bg-yellow-500  px-4 rounded-lg text-black font-medium transition-colors duration-200 flex justify-center items-center gap-2 text-center h-12',
            {
              'lg:h-auto lg:justify-start': !isHeader,
            },
          )}
        >
          <Search className='h-4 w-4' />
          Search
        </button>
      </div>
    </div>
  );
}
