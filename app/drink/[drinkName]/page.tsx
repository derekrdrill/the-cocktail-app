'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useCocktailData } from '@/hooks/useCocktailData';
import { useCocktailVideoData } from '@/hooks/useCocktailVideoData';
import { Header } from '@/app/_components/Header';
import { LoadingState } from '@/app/_components/LoadingState';
import { ErrorState } from '@/app/_components/ErrorState';
import { VideoPlayer } from '@/app/_components/VideoPlayer';
import { DrinkHero } from './components/DrinkHero';
import { DrinkIngredients } from './components/DrinkIngredients';
import { DrinkInstructions } from './components/DrinkInstructions';

export default function DrinkPage() {
  const params = useParams();
  const drinkName = decodeURIComponent(params.drinkName as string).replaceAll('-', ' ');
  const { data, isLoading, error } = useCocktailData();

  const drinkDetails = useMemo(() => {
    if (!data) return null;
    return data.cocktailData.find(
      cocktail => cocktail.strDrink.toLowerCase() === drinkName.toLowerCase(),
    );
  }, [data, drinkName]);

  const {
    data: videoData,
    isLoading: isVideoLoading,
    error: videoError,
  } = useCocktailVideoData(drinkDetails?.idDrink ?? '');

  console.log(videoData);

  if (isLoading) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
        <Header />
        <LoadingState message='Loading drink details...' />
      </main>
    );
  }

  if (error || !drinkDetails) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
        <Header />
        <ErrorState
          title='Drink Not Found'
          message="We couldn't find the drink you're looking for. Please try another one."
        />
      </main>
    );
  }

  // Get all ingredients and measures, properly typed
  const ingredients = Array.from({ length: 15 }, (_, i) => i + 1)
    .map(i => ({
      name: drinkDetails[`strIngredient${i}`],
      measure: drinkDetails[`strMeasure${i}`],
    }))
    .filter((ing): ing is { name: string; measure: string | null } => ing.name !== null);

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <Header />
      <DrinkHero
        drinkName={drinkDetails.strDrink}
        imageUrl={drinkDetails.strDrinkThumb}
        glassType={drinkDetails.strGlass}
        alcoholic={drinkDetails.strAlcoholic || 'Alcoholic'}
        difficulty={drinkDetails.difficulty}
      />
      <div className='container mx-auto max-w-[2000px] px-8 py-8'>
        <div className='space-y-6'>
          <DrinkIngredients ingredients={ingredients} />
          <DrinkInstructions instructions={drinkDetails.strInstructions} />
        </div>
      </div>
    </main>
  );
}
