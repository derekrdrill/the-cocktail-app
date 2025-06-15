import { Cocktail, SearchType, Selection, SortOption } from '@/types/types';

type GetDrinkIngredientsParams = {
  drink: Cocktail;
};

type GetFilteredDrinksParams = {
  drinks: Cocktail[];
  activeSearch: SearchState;
};

type GetIngredientCountParams = {
  drink: Cocktail;
};

type GetSortedDrinksByDifficultyParams = {
  drinks: Cocktail[];
  ascending: boolean;
};

type GetSortedDrinksByIngredientParams = {
  drinks: Cocktail[];
  ascending: boolean;
};

type GetSortedDrinksByNameParams = {
  drinks: Cocktail[];
  ascending: boolean;
};

type GetSortedDrinksParams = {
  drinks: Cocktail[];
  sortOption: SortOption;
};

type HasMatchingCategoryParams = {
  ingredient: string | undefined;
  category: string;
};

type HasMatchingDrinkGlassOrIngredientParams = {
  drink: Cocktail;
  searchQuery?: string;
  glassSelection?: Selection;
  ingredientSelections: Selection[];
};

type HasMatchingDrinkNameParams = {
  drink: Cocktail;
  searchQuery: string;
};

type HasMatchingGlassTypeParams = {
  drink: Cocktail;
  glassSelection: Selection | undefined;
};

type HasMatchingIngredientsParams = {
  drink: Cocktail;
  ingredientSelections: Selection[];
};

type IsGeneralIngredientParams = {
  ingredient: string;
};

type SearchState = {
  type: SearchType;
  query: string;
  selections: Selection[];
} | null;

export type {
  GetDrinkIngredientsParams,
  GetFilteredDrinksParams,
  GetIngredientCountParams,
  GetSortedDrinksByDifficultyParams,
  GetSortedDrinksByIngredientParams,
  GetSortedDrinksByNameParams,
  GetSortedDrinksParams,
  HasMatchingCategoryParams,
  HasMatchingDrinkGlassOrIngredientParams,
  HasMatchingDrinkNameParams,
  HasMatchingGlassTypeParams,
  HasMatchingIngredientsParams,
  IsGeneralIngredientParams,
};
