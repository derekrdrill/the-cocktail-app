'use client';

import { useMemo } from 'react';
import { CommandEmpty, CommandList, CommandSeparator } from '@/app/_components/ui/command';
import { Selection } from '../types';
import { SearchBarMenuSection } from '@/app/_components/SearchBar/components/SearchBarMenuSection';
import { filterResults, shouldShowSection } from '../helpers';

type SearchBarMenuProps = {
  searchQuery: string;
  selections: Selection[];
  data: {
    cocktailNames: string[];
    glassTypes: string[];
    ingredients: string[];
  } | null;
  isLoading: boolean;
  onSelection: (type: 'cocktail' | 'glass' | 'ingredient', value: string) => void;
};

export function SearchBarMenu({
  searchQuery,
  selections,
  data,
  isLoading,
  onSelection,
}: SearchBarMenuProps) {
  const filteredResults = useMemo(
    () => filterResults(data, searchQuery, selections),
    [searchQuery, data, selections],
  );

  const hasResults =
    filteredResults.cocktails.length > 0 ||
    filteredResults.glasses.length > 0 ||
    filteredResults.ingredients.length > 0;

  return (
    <CommandList className='absolute top-full left-0 w-full mt-1 bg-popover border rounded-md shadow-md max-h-[400px] overflow-y-auto'>
      {!hasResults && <CommandEmpty>No results found.</CommandEmpty>}

      <SearchBarMenuSection
        title='Cocktails'
        items={filteredResults.cocktails}
        type='cocktail'
        onSelection={onSelection}
        shouldShow={shouldShowSection('cocktail', selections)}
      />

      {shouldShowSection('glass', selections) && filteredResults.glasses.length > 0 && (
        <CommandSeparator className='my-2' />
      )}
      <SearchBarMenuSection
        title='Glass Types'
        items={filteredResults.glasses}
        type='glass'
        onSelection={onSelection}
        shouldShow={shouldShowSection('glass', selections)}
      />

      {filteredResults.ingredients.length > 0 && <CommandSeparator className='my-2' />}
      <SearchBarMenuSection
        title='Ingredients'
        items={filteredResults.ingredients}
        type='ingredient'
        onSelection={onSelection}
        shouldShow={shouldShowSection('ingredient', selections)}
      />
    </CommandList>
  );
}
