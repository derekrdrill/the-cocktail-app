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
import { DrinkTags } from './components/DrinkTags';

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

  // Get tags if they exist
  const tags = drinkDetails.strTags ? drinkDetails.strTags.split(',') : [];

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <Header />
      <DrinkHero
        drinkName={drinkDetails.strDrink}
        imageUrl={drinkDetails.strDrinkThumb}
        glassType={drinkDetails.strGlass}
        alcoholic={drinkDetails.strAlcoholic || 'Alcoholic'}
      />

      <div className='container mx-auto max-w-[2000px] px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left Column - Ingredients & Instructions */}
          <div className='lg:col-span-8 space-y-6'>
            <DrinkIngredients ingredients={ingredients} />
            <DrinkInstructions instructions={drinkDetails.strInstructions} />
            <DrinkTags tags={tags} />
          </div>

          {/* Right Column - Video */}
          <div className='lg:col-span-4'>
            <div className='sticky top-8'>
              <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
                <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
                  <span className='text-yellow-400'>How to Make</span>
                </h2>
                <VideoPlayer
                  videoData={videoData ?? null}
                  isLoading={isVideoLoading}
                  error={videoError?.toString()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
