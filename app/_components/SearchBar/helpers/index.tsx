'use client';

import { Selection, FilteredResults, FilterData, SearchType } from '../types';

export function filterResults(
  cocktailsData: FilterData,
  searchQuery: string,
  selections: Selection[],
  searchType: SearchType = 'All',
): FilteredResults {
  if (!cocktailsData) return { cocktails: [], glasses: [], ingredients: [] };

  const query = searchQuery.toLowerCase();
  const MAX_TOTAL_RESULTS = 12;
  const DEFAULT_PER_SECTION = 4;

  // First, get all matches for each category based only on search query
  const allMatches = {
    cocktails: cocktailsData.cocktailNames.filter(name => name.toLowerCase().includes(query)),
    glasses: cocktailsData.glassTypes.filter(glass => glass.toLowerCase().includes(query)),
    ingredients: cocktailsData.ingredients.filter(ingredient =>
      ingredient.toLowerCase().includes(query),
    ),
  };

  // If searchType is not 'All', return all matches for the selected type
  if (searchType !== 'All') {
    return {
      cocktails: searchType === 'Cocktail name' ? allMatches.cocktails : [],
      glasses: searchType === 'Glass types' ? allMatches.glasses : [],
      ingredients: searchType === 'Ingredients' ? allMatches.ingredients : [],
    };
  }

  // If there's no search query, show default number per section
  if (!query) {
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
