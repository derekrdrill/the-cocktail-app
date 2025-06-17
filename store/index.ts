import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SearchType, Selection, SortOption } from '@/types/types';

type CocktailState = {
  cocktailsData: {
    cocktailNames: string[];
    glassTypes: string[];
    ingredients: string[];
  } | null;
  isSearchMenuOpen: boolean;
  isSearchTypeMenuOpen: boolean;
  searchType: SearchType;
  searchQuery: string;
  selections: Selection[];
  activeSearch: {
    type: SearchType;
    query: string;
    selections: Selection[];
  } | null;
  sortOption: SortOption;
  totalResults: number;
  setCocktailsData: (data: CocktailState['cocktailsData']) => void;
  setIsSearchMenuOpen: (isOpen: boolean) => void;
  setIsSearchTypeMenuOpen: (isOpen: boolean) => void;
  setSearchType: (type: SearchType) => void;
  setSearchQuery: (query: string) => void;
  setSelections: (selections: Selection[]) => void;
  clearSearchState: () => void;
  closeSearchMenu: () => void;
  setActiveSearch: () => void;
  setSortOption: (option: SortOption) => void;
  setTotalResults: (count: number) => void;
};

export const useCocktailStore = create<CocktailState>()(
  persist(
    set => ({
      // Initial state
      cocktailsData: null,
      isSearchMenuOpen: false,
      isSearchTypeMenuOpen: false,
      searchType: 'All',
      searchQuery: '',
      selections: [],
      activeSearch: null,
      sortOption: 'name-asc',
      totalResults: 0,

      // Actions
      setCocktailsData: data => set({ cocktailsData: data }),
      setIsSearchMenuOpen: isOpen => set({ isSearchMenuOpen: isOpen }),
      setIsSearchTypeMenuOpen: isOpen => set({ isSearchTypeMenuOpen: isOpen }),
      setSearchType: type => set({ searchType: type }),
      setSearchQuery: query => set({ searchQuery: query }),
      setSelections: selections => set({ selections }),
      clearSearchState: () =>
        set({
          searchQuery: '',
          selections: [],
        }),
      closeSearchMenu: () => set({ isSearchMenuOpen: false }),
      setActiveSearch: () =>
        set(state => ({
          activeSearch: {
            type: state.searchType,
            query: state.searchQuery,
            selections: state.selections,
          },
        })),
      setSortOption: option => set({ sortOption: option }),
      setTotalResults: count => set({ totalResults: count }),
    }),
    {
      name: 'search-state',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        searchType: state.searchType,
        searchQuery: state.searchQuery,
        selections: state.selections,
        activeSearch: state.activeSearch,
        totalResults: state.totalResults,
      }),
    },
  ),
);
