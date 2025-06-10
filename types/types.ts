type SearchType = 'All' | 'Cocktail name' | 'Glass types' | 'Ingredients';

type Selection = {
  type: 'cocktail' | 'glass' | 'ingredient';
  value: string;
};

type FilteredResults = {
  cocktails: string[];
  glasses: string[];
  ingredients: string[];
};

type FilterData = {
  cocktailNames: string[];
  glassTypes: string[];
  ingredients: string[];
} | null;

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strGlass: string;
  [key: string]: string | null; // This allows for dynamic ingredient properties
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

type CocktailCategory = {
  name: string;
  description: string;
  slug: string;
  gradient: string;
  glow: string;
};

type CocktailData = {
  cocktailData: Cocktail[];
  cocktailNames: string[];
  glassTypes: string[];
  ingredients: string[];
};

type CocktailDataWithRandoms = CocktailData & {
  randomCocktails: Cocktail[];
};

export type {
  Cocktail,
  CocktailCategory,
  CocktailData,
  CocktailDataWithRandoms,
  FilterData,
  FilteredResults,
  SearchType,
  Selection,
};
