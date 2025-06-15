import { FilterData, SearchType } from '@/types/types';

export interface GetSearchBarOptionsParams {
  cocktailsData: FilterData;
  searchQuery: string;
  searchType?: SearchType;
}

export interface FilterMatches {
  cocktails: string[];
  glasses: string[];
  ingredients: string[];
}
