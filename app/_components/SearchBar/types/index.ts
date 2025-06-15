type SearchOptions = {
  cocktails: string[];
  glasses: string[];
  ingredients: string[];
} | null;

type SearchType = 'All' | 'Cocktail name' | 'Glass types' | 'Ingredients';

export type { SearchOptions, SearchType };
