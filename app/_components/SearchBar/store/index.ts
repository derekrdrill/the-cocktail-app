import { create } from 'zustand';
import { Selection } from '../types';

type SearchType = 'All' | 'Cocktail name' | 'Glass types' | 'Ingredients';

interface SearchBarState {
  cocktailsData: {
    cocktailNames: string[];
    glassTypes: string[];
    ingredients: string[];
  } | null;
  isMenuOpen: boolean;
  isSearchTypeMenuOpen: boolean;
  searchQuery: string;
  searchType: SearchType;
  selections: Selection[];
  setCocktailsData: (data: SearchBarState['cocktailsData']) => void;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  setIsSearchTypeMenuOpen: (isSearchTypeMenuOpen: boolean) => void;
  setSearchType: (searchType: SearchType) => void;
  setSearchQuery: (query: string) => void;
  setSelections: (selections: Selection[]) => void;
}

export const useSearchBarStore = create<SearchBarState>(set => ({
  cocktailsData: null,
  isMenuOpen: false,
  isSearchTypeMenuOpen: false,
  searchType: 'All',
  searchQuery: '',
  selections: [],
  setCocktailsData: data => set({ cocktailsData: data }),
  setIsMenuOpen: isMenuOpen => set({ isMenuOpen }),
  setIsSearchTypeMenuOpen: isSearchTypeMenuOpen => set({ isSearchTypeMenuOpen }),
  setSearchType: searchType => set({ searchType }),
  setSearchQuery: searchQuery => set({ searchQuery }),
  setSelections: selections => set({ selections }),
}));
