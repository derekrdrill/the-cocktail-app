'use client';

import { useState, useMemo } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { useCocktailData } from '../_hooks/useCocktailData';

type Selection = {
  type: 'glass' | 'ingredient';
  value: string;
};

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);
  const { data, isLoading } = useCocktailData();

  const filteredResults = useMemo(() => {
    if (!data) return { cocktails: [], glasses: [], ingredients: [] };

    const query = searchQuery.toLowerCase();
    const MAX_TOTAL_RESULTS = 12;
    const DEFAULT_PER_SECTION = 4;

    // Determine which sections should be shown based on current selections
    const hasGlassSelection = selections.some(s => s.type === 'glass');
    const hasIngredientSelection = selections.some(s => s.type === 'ingredient');

    // First, get all matches for each category
    const allMatches = {
      cocktails: data.cocktailNames.filter(name => name.toLowerCase().includes(query)),
      glasses: data.glassTypes.filter(
        glass =>
          glass.toLowerCase().includes(query) &&
          !selections.some(s => s.type === 'glass' && s.value === glass),
      ),
      ingredients: data.ingredients.filter(
        ingredient =>
          ingredient.toLowerCase().includes(query) &&
          !selections.some(s => s.type === 'ingredient' && s.value === ingredient),
      ),
    };

    // If there's no search query and no selections, show default number per section
    if (!query && selections.length === 0) {
      return {
        cocktails: allMatches.cocktails.slice(0, DEFAULT_PER_SECTION),
        glasses: allMatches.glasses.slice(0, DEFAULT_PER_SECTION),
        ingredients: allMatches.ingredients.slice(0, DEFAULT_PER_SECTION),
      };
    }

    // Calculate the total number of matches
    const totalMatches =
      allMatches.cocktails.length + allMatches.glasses.length + allMatches.ingredients.length;

    // If we have fewer matches than the max, return all matches
    if (totalMatches <= MAX_TOTAL_RESULTS) {
      return allMatches;
    }

    // Calculate proportional distribution
    const cocktailRatio = allMatches.cocktails.length / totalMatches;
    const glassRatio = allMatches.glasses.length / totalMatches;
    const ingredientRatio = allMatches.ingredients.length / totalMatches;

    // Distribute the MAX_TOTAL_RESULTS proportionally
    return {
      cocktails: allMatches.cocktails.slice(
        0,
        Math.max(1, Math.round(MAX_TOTAL_RESULTS * cocktailRatio)),
      ),
      glasses: allMatches.glasses.slice(0, Math.max(1, Math.round(MAX_TOTAL_RESULTS * glassRatio))),
      ingredients: allMatches.ingredients.slice(
        0,
        Math.max(1, Math.round(MAX_TOTAL_RESULTS * ingredientRatio)),
      ),
    };
  }, [searchQuery, data, selections]);

  const hasResults =
    filteredResults.cocktails.length > 0 ||
    filteredResults.glasses.length > 0 ||
    filteredResults.ingredients.length > 0;

  const handleSelection = (type: 'cocktail' | 'glass' | 'ingredient', value: string) => {
    if (type === 'cocktail') {
      // TODO: Navigate to cocktail details page
      setSearchQuery(value);
      setIsFocused(false);
      return;
    }

    // For glass and ingredient selections
    const newSelection: Selection = { type, value };
    setSelections(prev => [...prev, newSelection]);

    // Update the search query to show all selections
    const updatedSelections = [...selections, newSelection];
    const displayQuery = updatedSelections.map(s => s.value).join(', ');
    setSearchQuery(displayQuery);
  };

  const removeSelection = (selectionToRemove: Selection) => {
    const newSelections = selections.filter(
      s => !(s.type === selectionToRemove.type && s.value === selectionToRemove.value),
    );
    setSelections(newSelections);

    // Update the search query
    const displayQuery = newSelections.map(s => s.value).join(', ');
    setSearchQuery(displayQuery);
  };

  return (
    <div className='w-full max-w-4xl mx-auto mb-8'>
      <div className='relative'>
        <Command className='rounded-lg border shadow-md'>
          <CommandInput
            placeholder='Search cocktails, glasses, or ingredients...'
            value={searchQuery}
            onValueChange={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && (
            <CommandList className='absolute top-full left-0 w-full mt-1 bg-popover border rounded-md shadow-md max-h-[400px] overflow-y-auto'>
              {!hasResults && <CommandEmpty>No results found.</CommandEmpty>}

              {filteredResults.cocktails.length > 0 &&
                !selections.some(s => s.type === 'glass' || s.type === 'ingredient') && (
                  <CommandGroup
                    heading='Cocktails'
                    className='p-2 bg-muted/50 border-b border-border'
                  >
                    {filteredResults.cocktails.map(name => (
                      <CommandItem
                        key={`cocktail-${name}`}
                        onSelect={() => handleSelection('cocktail', name)}
                        className='cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2'
                      >
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

              {filteredResults.glasses.length > 0 &&
                !selections.some(s => s.type === 'glass') &&
                !selections.some(s => s.type === 'ingredient') && (
                  <>
                    <CommandSeparator className='my-2' />
                    <CommandGroup
                      heading='Glass Types'
                      className='p-2 bg-muted/50 border-b border-border'
                    >
                      {filteredResults.glasses.map(glass => (
                        <CommandItem
                          key={`glass-${glass}`}
                          onSelect={() => handleSelection('glass', glass)}
                          className='cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2'
                        >
                          {glass}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}

              {filteredResults.ingredients.length > 0 && (
                <>
                  <CommandSeparator className='my-2' />
                  <CommandGroup
                    heading='Ingredients'
                    className='p-2 bg-muted/50 border-b border-border'
                  >
                    {filteredResults.ingredients.map(ingredient => (
                      <CommandItem
                        key={`ingredient-${ingredient}`}
                        onSelect={() => handleSelection('ingredient', ingredient)}
                        className='cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2'
                      >
                        {ingredient}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  );
}
