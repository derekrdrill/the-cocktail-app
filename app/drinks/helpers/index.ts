import { generalIngredients } from '@/constants/constants';
import { getNormalizedString } from '@/utils';
import { Cocktail } from '@/types/types';
import {
  GetDrinkIngredientsParams,
  HasMatchingCategoryParams,
  HasMatchingDrinkNameParams,
  HasMatchingGlassTypeParams,
  HasMatchingIngredientsParams,
  HasMatchingDrinkGlassOrIngredientParams,
  IsGeneralIngredientParams,
  GetIngredientCountParams,
  GetSortedDrinksByNameParams,
  GetSortedDrinksByIngredientParams,
  GetSortedDrinksByDifficultyParams,
  GetFilteredDrinksParams,
  GetSortedDrinksParams,
} from './types';

function getDrinkIngredients({ drink }: GetDrinkIngredientsParams): string[] {
  return Array.from({ length: 15 }, (_, i) => i + 1)
    .map(i => drink[`strIngredient${i}`])
    .filter((ingredient): ingredient is string => Boolean(ingredient))
    .map(ingredient => ingredient.toLowerCase().trim());
}

function getFilteredDrinks({ drinks, activeSearch }: GetFilteredDrinksParams): Cocktail[] {
  if (!drinks || !activeSearch) return [];

  return drinks.filter(drink => {
    const { type: searchType, query: searchQuery, selections } = activeSearch;

    switch (searchType) {
      case 'Cocktail name':
        return searchQuery ? hasMatchingDrinkName({ drink, searchQuery }) : false;

      case 'Glass types': {
        const glassSelection = selections.find(s => s.type === 'glass');
        return hasMatchingGlassType({ drink, glassSelection });
      }

      case 'Ingredients': {
        const ingredientSelections = selections.filter(s => s.type === 'ingredient');
        return hasMatchingIngredients({ drink, ingredientSelections });
      }

      case 'All': {
        const glassSelection = selections.find(s => s.type === 'glass');
        const ingredientSelections = selections.filter(s => s.type === 'ingredient');
        return hasMatchingDrinkGlassOrIngredient({
          drink,
          searchQuery,
          glassSelection,
          ingredientSelections,
        });
      }

      default:
        return false;
    }
  });
}

function getIngredientCount({ drink }: GetIngredientCountParams): number {
  return Array.from({ length: 15 }, (_, i) => i + 1).filter(i => drink[`strIngredient${i}`]).length;
}

function getSortedDrinksByDifficulty({
  drinks,
  ascending,
}: GetSortedDrinksByDifficultyParams): Cocktail[] {
  const difficultyOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };

  return [...drinks].sort((a, b) => {
    const aDifficulty = difficultyOrder[a.difficulty];
    const bDifficulty = difficultyOrder[b.difficulty];

    if (aDifficulty === bDifficulty) {
      return a.strDrink.localeCompare(b.strDrink);
    }

    return ascending ? aDifficulty - bDifficulty : bDifficulty - aDifficulty;
  });
}

function getSortedDrinksByIngredient({
  drinks,
  ascending,
}: GetSortedDrinksByIngredientParams): Cocktail[] {
  return [...drinks].sort((a, b) => {
    const aCount = getIngredientCount({ drink: a });
    const bCount = getIngredientCount({ drink: b });

    if (aCount === bCount) {
      return a.strDrink.localeCompare(b.strDrink);
    }

    return ascending ? aCount - bCount : bCount - aCount;
  });
}

function getSortedDrinksByName({ drinks, ascending }: GetSortedDrinksByNameParams): Cocktail[] {
  return [...drinks].sort((a, b) => {
    const comparison = a.strDrink.localeCompare(b.strDrink);
    return ascending ? comparison : -comparison;
  });
}

function getSortedDrinks({ drinks, sortOption }: GetSortedDrinksParams): Cocktail[] {
  switch (sortOption) {
    case 'name-asc':
      return getSortedDrinksByName({ drinks, ascending: true });
    case 'name-desc':
      return getSortedDrinksByName({ drinks, ascending: false });
    case 'ingredients-asc':
      return getSortedDrinksByIngredient({ drinks, ascending: true });
    case 'ingredients-desc':
      return getSortedDrinksByIngredient({ drinks, ascending: false });
    case 'difficulty-asc':
      return getSortedDrinksByDifficulty({ drinks, ascending: true });
    case 'difficulty-desc':
      return getSortedDrinksByDifficulty({ drinks, ascending: false });
    default:
      return drinks;
  }
}

function hasMatchingCategory({ ingredient, category }: HasMatchingCategoryParams): boolean {
  if (!ingredient) return false;

  const normalizedIngredient = getNormalizedString(ingredient);
  const normalizedCategory = getNormalizedString(category);

  if (isGeneralIngredient({ ingredient: normalizedCategory })) {
    const ingredientWords = normalizedIngredient.split(/\s+/);
    return ingredientWords.some(word => word === normalizedCategory);
  }

  return normalizedIngredient === normalizedCategory;
}

function hasMatchingDrinkName({ drink, searchQuery }: HasMatchingDrinkNameParams): boolean {
  return getNormalizedString(drink.strDrink).includes(getNormalizedString(searchQuery));
}

function hasMatchingGlassType({ drink, glassSelection }: HasMatchingGlassTypeParams): boolean {
  if (!glassSelection) return false;
  return getNormalizedString(drink.strGlass) === getNormalizedString(glassSelection.value);
}

function hasMatchingIngredients({
  drink,
  ingredientSelections,
}: HasMatchingIngredientsParams): boolean {
  if (ingredientSelections.length === 0) return false;

  const drinkIngredients = getDrinkIngredients({ drink });
  return ingredientSelections.some(selection =>
    drinkIngredients.some(ingredient =>
      hasMatchingCategory({ ingredient, category: selection.value }),
    ),
  );
}

function hasMatchingDrinkGlassOrIngredient({
  drink,
  searchQuery = '',
  glassSelection,
  ingredientSelections,
}: HasMatchingDrinkGlassOrIngredientParams): boolean {
  const matchesSearchQuery = !searchQuery || hasMatchingDrinkName({ drink, searchQuery });

  const hasAnySelections = !!glassSelection || ingredientSelections.length > 0;

  // If there are no selections, then the drink only needs to match the search query (if present)
  if (!hasAnySelections) {
    return matchesSearchQuery;
  }

  // If there are selections, at least one of them must match
  let matchesAtLeastOneSelection = false;

  if (glassSelection && hasMatchingGlassType({ drink, glassSelection })) {
    matchesAtLeastOneSelection = true;
  }

  if (ingredientSelections.length > 0 && hasMatchingIngredients({ drink, ingredientSelections })) {
    matchesAtLeastOneSelection = true;
  }

  return matchesSearchQuery && matchesAtLeastOneSelection;
}

function isGeneralIngredient({ ingredient }: IsGeneralIngredientParams): boolean {
  return generalIngredients.some(
    category => ingredient.toLowerCase().trim() === category.toLowerCase(),
  );
}

export { getFilteredDrinks, getSortedDrinks };
