'use client';

import { useMemo } from 'react';
import { useCocktailStore } from '@/store';
import { getSearchBarOptions } from '../helpers';
import { SearchBarMenuSection } from './SearchBarMenuSection';

export function SearchBarMenu() {
  const { searchQuery, selections, cocktailsData, setIsSearchMenuOpen, searchType } =
    useCocktailStore();

  const filteredResults = useMemo(
    () => getSearchBarOptions({ cocktailsData, searchQuery, searchType }),
    [searchQuery, cocktailsData, selections, searchType],
  );

  // Provide default value if filteredResults is null
  const results = filteredResults || { cocktails: [], glasses: [], ingredients: [] };

  const shouldShowSection = (type: 'cocktail' | 'glass' | 'ingredient') => {
    if (searchType === 'All') return true;
    if (searchType === 'Cocktail name' && type === 'cocktail') return true;
    if (searchType === 'Glass types' && type === 'glass') return true;
    if (searchType === 'Ingredients' && type === 'ingredient') return true;
    return false;
  };

  const hasResults =
    (shouldShowSection('cocktail') && results.cocktails.length > 0) ||
    (shouldShowSection('glass') && results.glasses.length > 0) ||
    (shouldShowSection('ingredient') && results.ingredients.length > 0);

  return (
    <div className='absolute bg-white border border-t-0 left-0 max-h-96 mt-1 overflow-auto rounded-b-lg shadow-lg top-full w-full z-50'>
      {!hasResults ? (
        <div className='p-4 text-center text-gray-500 text-sm'>No results found.</div>
      ) : (
        <>
          {shouldShowSection('cocktail') && (
            <SearchBarMenuSection
              title='Cocktails'
              items={results.cocktails}
              type='cocktail'
              shouldShow={results.cocktails.length > 0}
            />
          )}
          {shouldShowSection('glass') && (
            <SearchBarMenuSection
              title='Glass Types'
              items={results.glasses}
              type='glass'
              shouldShow={results.glasses.length > 0}
            />
          )}
          {shouldShowSection('ingredient') && (
            <SearchBarMenuSection
              title='Ingredients'
              items={results.ingredients}
              type='ingredient'
              shouldShow={results.ingredients.length > 0}
            />
          )}
        </>
      )}
    </div>
  );
}
