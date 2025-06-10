'use client';

import { useCocktailData } from '@/hooks/useCocktailData';
import { CocktailCard } from './CocktailCard';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export function CocktailGrid() {
  const { data, isLoading, error } = useCocktailData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className='mb-8'>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold text-white'>Featured Drinks</h2>
        <p className='mt-2 text-gray-300'>
          Discover our handpicked selection of classic and contemporary cocktails
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {data?.randomCocktails.map(cocktail => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}
