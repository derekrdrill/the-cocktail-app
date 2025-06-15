'use client';

import { useMemo } from 'react';
import { useSearchBarStore } from '@/store';
import { getSearchBarOptions } from '../helpers';
import { SearchBarMenuSection } from './SearchBarMenuSection';

export function SearchBarMenu() {
  const { searchQuery, selections, cocktailsData, setIsSearchMenuOpen, searchType } =
    useSearchBarStore();

  const filteredResults = useMemo(
    () => getSearchBarOptions({ cocktailsData, searchQuery, searchType }),
    [searchQuery, cocktailsData, selections, searchType],
  );

  const shouldShowSection = (type: 'cocktail' | 'glass' | 'ingredient') => {
    if (searchType === 'All') return true;
    if (searchType === 'Cocktail name' && type === 'cocktail') return true;
    if (searchType === 'Glass types' && type === 'glass') return true;
    if (searchType === 'Ingredients' && type === 'ingredient') return true;
    return false;
  };

  const hasResults =
    (shouldShowSection('cocktail') && filteredResults.cocktails.length > 0) ||
    (shouldShowSection('glass') && filteredResults.glasses.length > 0) ||
    (shouldShowSection('ingredient') && filteredResults.ingredients.length > 0);

  return (
    <div className='absolute bg-white border border-t-0 left-0 max-h-96 mt-1 overflow-auto rounded-b-lg shadow-lg top-full w-full z-50'>
      {!hasResults ? (
        <div className='p-4 text-center text-gray-500 text-sm'>No results found.</div>
      ) : (
        <>
          {shouldShowSection('cocktail') && (
            <SearchBarMenuSection
              title='Cocktails'
              items={filteredResults.cocktails}
              type='cocktail'
              shouldShow={filteredResults.cocktails.length > 0}
            />
          )}
          {shouldShowSection('glass') && (
            <SearchBarMenuSection
              title='Glass Types'
              items={filteredResults.glasses}
              type='glass'
              shouldShow={filteredResults.glasses.length > 0}
            />
          )}
          {shouldShowSection('ingredient') && (
            <SearchBarMenuSection
              title='Ingredients'
              items={filteredResults.ingredients}
              type='ingredient'
              shouldShow={filteredResults.ingredients.length > 0}
            />
          )}
        </>
      )}
    </div>
  );
}
