'use client';

import { Selection, FilteredResults, FilterData } from '../types';

export function filterResults(
  data: FilterData,
  searchQuery: string,
  selections: Selection[],
): FilteredResults {
  if (!data) return { cocktails: [], glasses: [], ingredients: [] };

  const query = searchQuery.toLowerCase();
  const MAX_TOTAL_RESULTS = 12;
  const DEFAULT_PER_SECTION = 4;

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
}

export function shouldShowSection(
  type: 'cocktail' | 'glass' | 'ingredient',
  selections: Selection[],
): boolean {
  switch (type) {
    case 'cocktail':
      return !selections.some(s => s.type === 'glass' || s.type === 'ingredient');
    case 'glass':
      return (
        !selections.some(s => s.type === 'glass') && !selections.some(s => s.type === 'ingredient')
      );
    case 'ingredient':
      return true;
  }
}

export function handleSelection(
  type: 'cocktail' | 'glass' | 'ingredient',
  value: string,
  selections: Selection[],
  setSelections: (selections: Selection[]) => void,
  setSearchQuery: (query: string) => void,
  router: { push: (path: string) => void },
) {
  if (type === 'cocktail') {
    router.push(`/cocktail/${encodeURIComponent(value)}`);
    return;
  }

  // For glass and ingredient selections
  const newSelection: Selection = { type, value };
  setSelections([...selections, newSelection]);

  // Update the search query to show all selections
  const updatedSelections = [...selections, newSelection];
  const displayQuery = updatedSelections.map(s => s.value).join(', ');
  setSearchQuery(displayQuery);
}

export function handleRemoveSelection(
  selectionToRemove: Selection,
  selections: Selection[],
  setSelections: (selections: Selection[]) => void,
  setSearchQuery: (query: string) => void,
) {
  const newSelections = selections.filter(
    s => !(s.type === selectionToRemove.type && s.value === selectionToRemove.value),
  );
  setSelections(newSelections);

  // Update the search query
  const displayQuery = newSelections.map(s => s.value).join(', ');
  setSearchQuery(displayQuery);
}
