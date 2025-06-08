'use client';

import { useState, useRef, useEffect } from 'react';
import { Command } from '../ui/command';
import { useCocktailData } from '@/app/_hooks/useCocktailData';
import { useRouter } from 'next/navigation';
import { SearchBarInput } from './components/SearchBarInput';
import { SearchBarMenu } from './components/SearchBarMenu';
import { handleSelection, handleRemoveSelection } from './helpers';
import { Selection } from './types';

export function SearchBarV2() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const { data: cocktailData, isLoading } = useCocktailData();
  const router = useRouter();

  // Transform the data into the format expected by SearchBarMenu
  const data = cocktailData
    ? {
        cocktailNames: cocktailData.cocktailNames,
        glassTypes: cocktailData.glassTypes,
        ingredients: cocktailData.ingredients,
      }
    : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSelection = (type: 'cocktail' | 'glass' | 'ingredient', value: string) => {
    handleSelection(type, value, selections, setSelections, setSearchQuery, router);
  };

  const onRemoveSelection = (selectionToRemove: Selection) => {
    handleRemoveSelection(selectionToRemove, selections, setSelections, setSearchQuery);
  };

  return (
    <div className='w-full max-w-4xl mx-auto mb-8'>
      <div className='relative' ref={commandRef}>
        <Command className='rounded-lg border shadow-md'>
          <SearchBarInput
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && (
            <SearchBarMenu
              searchQuery={searchQuery}
              selections={selections}
              data={data}
              isLoading={isLoading}
              onSelection={onSelection}
            />
          )}
        </Command>
      </div>
    </div>
  );
}
