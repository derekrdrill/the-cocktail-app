'use client';

import { useMemo } from 'react';
import { filterResults } from '../helpers';
import { useSearchBarStore } from '../store';
import { SearchBarMenuSection } from './SearchBarMenuSection';

export function SearchBarMenu() {
  const { searchQuery, selections, cocktailsData, setIsMenuOpen } = useSearchBarStore();

  const filteredResults = useMemo(
    () => filterResults(cocktailsData, searchQuery, selections),
    [searchQuery, cocktailsData, selections],
  );

  const hasResults =
    filteredResults.cocktails.length > 0 ||
    filteredResults.glasses.length > 0 ||
    filteredResults.ingredients.length > 0;

  return (
    <div className='absolute bg-white border border-t-0 left-0 max-h-96 mt-1 overflow-auto rounded-b-lg shadow-lg top-full w-full z-50'>
      {!hasResults ? (
        <div className='p-4 text-center text-gray-500 text-sm'>No results found.</div>
      ) : (
        <>
          <SearchBarMenuSection
            title='Cocktails'
            items={filteredResults.cocktails}
            type='cocktail'
            shouldShow={filteredResults.cocktails.length > 0}
          />
          <SearchBarMenuSection
            title='Glass Types'
            items={filteredResults.glasses}
            type='glass'
            shouldShow={filteredResults.glasses.length > 0}
          />
          <SearchBarMenuSection
            title='Ingredients'
            items={filteredResults.ingredients}
            type='ingredient'
            shouldShow={filteredResults.ingredients.length > 0}
          />
        </>
      )}
    </div>
  );
}
