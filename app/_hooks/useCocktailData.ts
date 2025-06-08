import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strGlass: string;
  [key: string]: string | null; // This allows for dynamic ingredient properties
}

interface CocktailData {
  cocktailData: Cocktail[];
  cocktailNames: string[];
  glassTypes: string[];
  ingredients: string[];
}

interface CocktailResponse extends CocktailData {
  randomCocktails: Cocktail[];
}

const cocktailOptions = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-cocktail-names-glasses-ingredients`,
};

function getRandomCocktails(cocktails: Cocktail[], count: number): Cocktail[] {
  const shuffled = [...cocktails].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function useCocktailData() {
  return useQuery<CocktailResponse>({
    queryKey: ["cocktailData"],
    queryFn: async () => {
      const response = await axios.request(cocktailOptions);
      const data = response.data;
      return {
        ...data,
        randomCocktails: getRandomCocktails(data.cocktailData, 12),
      };
    },
  });
}
