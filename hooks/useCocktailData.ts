import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSearchBarStore } from '@/store';
import { Cocktail, CocktailDataWithRandoms } from '@/types/types';

const cocktailRequestOptions = {
  method: 'GET',
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-cocktail-names-glasses-ingredients`,
};

function getRandomCocktails(cocktails: Cocktail[], count: number): Cocktail[] {
  const shuffled = [...cocktails].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function useCocktailData() {
  const { setCocktailsData } = useSearchBarStore();

  return useQuery<CocktailDataWithRandoms>({
    queryKey: ['cocktailData'],
    queryFn: async () => {
      const response = await axios.request(cocktailRequestOptions);
      const data = response.data;

      // Update the store with the cocktail data
      setCocktailsData({
        cocktailNames: data.cocktailNames,
        glassTypes: data.glassTypes,
        ingredients: data.ingredients,
      });

      return {
        ...data,
        randomCocktails: getRandomCocktails(data.cocktailData, 12),
      };
    },
  });
}
