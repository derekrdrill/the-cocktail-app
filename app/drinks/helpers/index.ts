import { Cocktail, SearchType, Selection, SortOption } from '@/types/types';

type SearchState = {
  type: SearchType;
  query: string;
  selections: Selection[];
} | null;

export function getFilteredDrinks(drinks: Cocktail[], activeSearch: SearchState): Cocktail[] {
  if (!drinks || !activeSearch) return [];

  return drinks.filter(drink => {
    const { type: searchType, query: searchQuery, selections } = activeSearch;

    // Get all ingredients for the drink
    const drinkIngredients = Array.from({ length: 15 }, (_, i) => i + 1)
      .map(i => drink[`strIngredient${i}`]?.toLowerCase().trim())
      .filter(Boolean);

    // Case 1: Search by cocktail name
    if (searchType === 'Cocktail name' && searchQuery) {
      return drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase());
    }

    // Case 2: Search by glass type
    if (searchType === 'Glass types') {
      const glassSelection = selections.find(s => s.type === 'glass');
      if (!glassSelection) return false;
      return drink.strGlass.toLowerCase() === glassSelection.value.toLowerCase();
    }

    // Case 3: Search by ingredients (including category filtering)
    if (searchType === 'Ingredients') {
      const ingredientSelections = selections.filter(s => s.type === 'ingredient');
      if (ingredientSelections.length === 0) return false;

      // For category filtering, we want to match if ANY of the category ingredients are present
      // For regular ingredient search, we want to match if ALL selected ingredients are present
      const isCategorySearch = ingredientSelections.length > 3; // If more than 3 ingredients, assume it's a category search

      if (isCategorySearch) {
        // For category search, match if ANY of the ingredients are present
        return ingredientSelections.some(selection =>
          drinkIngredients.some(ingredient => ingredient === selection.value.toLowerCase().trim()),
        );
      } else {
        // For regular ingredient search, match if ALL selected ingredients are present
        return ingredientSelections.every(selection =>
          drinkIngredients.some(ingredient => ingredient === selection.value.toLowerCase().trim()),
        );
      }
    }

    // Case 4: Search by glass type and ingredients (All search type)
    if (searchType === 'All') {
      const glassSelection = selections.find(s => s.type === 'glass');
      const ingredientSelections = selections.filter(s => s.type === 'ingredient');

      const matchesGlass =
        !glassSelection || drink.strGlass.toLowerCase() === glassSelection.value.toLowerCase();

      // For category filtering in All search type
      const isCategorySearch = ingredientSelections.length > 3;
      const matchesIngredients = isCategorySearch
        ? ingredientSelections.some(selection =>
            drinkIngredients.some(
              ingredient => ingredient === selection.value.toLowerCase().trim(),
            ),
          )
        : ingredientSelections.length === 0 ||
          ingredientSelections.every(selection =>
            drinkIngredients.some(
              ingredient => ingredient === selection.value.toLowerCase().trim(),
            ),
          );

      const matchesSearch =
        !searchQuery || drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesGlass && matchesIngredients && matchesSearch;
    }

    return false;
  });
}

export function getSortedDrinks(drinks: Cocktail[], sortOption: SortOption): Cocktail[] {
  return [...drinks].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return a.strDrink.localeCompare(b.strDrink);
      case 'name-desc':
        return b.strDrink.localeCompare(a.strDrink);
      case 'ingredients-asc': {
        const aCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
          i => a[`strIngredient${i}`],
        ).length;
        const bCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
          i => b[`strIngredient${i}`],
        ).length;
        // If ingredient counts are equal, sort alphabetically
        return aCount === bCount ? a.strDrink.localeCompare(b.strDrink) : aCount - bCount;
      }
      case 'ingredients-desc': {
        const aCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
          i => a[`strIngredient${i}`],
        ).length;
        const bCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
          i => b[`strIngredient${i}`],
        ).length;
        // If ingredient counts are equal, sort alphabetically
        return aCount === bCount ? a.strDrink.localeCompare(b.strDrink) : bCount - aCount;
      }
      case 'difficulty-asc': {
        const difficultyOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };
        // If difficulty levels are equal, sort alphabetically
        return difficultyOrder[a.difficulty] === difficultyOrder[b.difficulty]
          ? a.strDrink.localeCompare(b.strDrink)
          : difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      case 'difficulty-desc': {
        const difficultyOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };
        // If difficulty levels are equal, sort alphabetically
        return difficultyOrder[a.difficulty] === difficultyOrder[b.difficulty]
          ? a.strDrink.localeCompare(b.strDrink)
          : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      }
      default:
        return 0;
    }
  });
}
