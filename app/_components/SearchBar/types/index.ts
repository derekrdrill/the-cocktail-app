export type SearchType = 'All' | 'Cocktail name' | 'Glass types' | 'Ingredients';

export type Selection = {
  type: 'cocktail' | 'glass' | 'ingredient';
  value: string;
};

export type FilteredResults = {
  cocktails: string[];
  glasses: string[];
  ingredients: string[];
};

export type FilterData = {
  cocktailNames: string[];
  glassTypes: string[];
  ingredients: string[];
} | null;
