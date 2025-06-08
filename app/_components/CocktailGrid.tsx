"use client";

import { useCocktailData } from "../_hooks/useCocktailData";
import { CocktailCard } from "./CocktailCard";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strGlass: string;
  [key: string]: string | null;
}

export function CocktailGrid() {
  const { data, isLoading, error } = useCocktailData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data?.randomCocktails.map((cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
}
