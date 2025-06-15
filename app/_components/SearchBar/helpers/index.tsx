'use client';

import { SearchOptions } from '@/app/_components/SearchBar/types';
import {
  GetSearchBarOptionsParams,
  FilterMatches,
} from '@/app/_components/SearchBar/helpers/types';
import { FilterData, SearchType } from '@/types/types';
import {
  MAX_TOTAL_RESULTS,
  DEFAULT_PER_SECTION,
} from '@/app/_components/SearchBar/helpers/constants';

function getInitialMatches(cocktailsData: FilterData | null, query: string): FilterMatches {
  if (!cocktailsData) {
    return { cocktails: [], glasses: [], ingredients: [] };
  }

  return {
    cocktails: cocktailsData.cocktailNames.filter(name => name.toLowerCase().includes(query)),
    glasses: cocktailsData.glassTypes.filter(glass => glass.toLowerCase().includes(query)),
    ingredients: cocktailsData.ingredients.filter(ingredient =>
      ingredient.toLowerCase().includes(query),
    ),
  };
}

function handleSpecificSearchType(matches: FilterMatches, searchType: SearchType): SearchOptions {
  return {
    cocktails: searchType === 'Cocktail name' ? matches.cocktails : [],
    glasses: searchType === 'Glass types' ? matches.glasses : [],
    ingredients: searchType === 'Ingredients' ? matches.ingredients : [],
  };
}

function handleEmptyQuery(matches: FilterMatches): SearchOptions {
  return {
    cocktails: matches.cocktails.slice(0, DEFAULT_PER_SECTION),
    glasses: matches.glasses.slice(0, DEFAULT_PER_SECTION),
    ingredients: matches.ingredients.slice(0, DEFAULT_PER_SECTION),
  };
}

function getDistributedSearchBarOptions(matches: FilterMatches): SearchOptions {
  const totalMatches =
    matches.cocktails.length + matches.glasses.length + matches.ingredients.length;

  if (totalMatches <= MAX_TOTAL_RESULTS) {
    return matches;
  }

  const cocktailRatio = matches.cocktails.length / totalMatches;
  const glassRatio = matches.glasses.length / totalMatches;
  const ingredientRatio = matches.ingredients.length / totalMatches;

  return {
    cocktails: matches.cocktails.slice(
      0,
      Math.max(1, Math.round(MAX_TOTAL_RESULTS * cocktailRatio)),
    ),
    glasses: matches.glasses.slice(0, Math.max(1, Math.round(MAX_TOTAL_RESULTS * glassRatio))),
    ingredients: matches.ingredients.slice(
      0,
      Math.max(1, Math.round(MAX_TOTAL_RESULTS * ingredientRatio)),
    ),
  };
}

function getSearchBarOptions({
  cocktailsData,
  searchQuery,
  searchType = 'All',
}: GetSearchBarOptionsParams): SearchOptions {
  if (!cocktailsData) return { cocktails: [], glasses: [], ingredients: [] };

  const query = searchQuery.toLowerCase();
  const matches = getInitialMatches(cocktailsData, query);

  if (searchType !== 'All') {
    return handleSpecificSearchType(matches, searchType);
  }

  if (!query) {
    return handleEmptyQuery(matches);
  }

  return getDistributedSearchBarOptions(matches);
}

export { getSearchBarOptions };
