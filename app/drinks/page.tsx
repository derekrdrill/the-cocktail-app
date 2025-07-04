'use client';

import { useMemo, useEffect } from 'react';
import { useCocktailData } from '@/hooks/useCocktailData';
import { useCocktailStore } from '@/store';
import { Header } from '@/app/_components/Header';
import { DrinkRow } from './components/DrinkRow';
import { LoadingState } from '@/app/_components/LoadingState';
import { ErrorState } from '@/app/_components/ErrorState';
import { getFilteredDrinks, getSortedDrinks } from './helpers';

export default function DrinksPage() {
  const { data, isLoading, error } = useCocktailData();
  const { activeSearch, sortOption, setTotalResults } = useCocktailStore();

  const filteredAndSortedDrinks = useMemo(() => {
    if (!data?.cocktailData) return [];

    const filteredDrinks = getFilteredDrinks({ drinks: data.cocktailData, activeSearch });
    const filteredAndSortedDrinks = getSortedDrinks({ drinks: filteredDrinks, sortOption });

    return filteredAndSortedDrinks;
  }, [data, activeSearch, sortOption]);

  useEffect(() => {
    setTotalResults(filteredAndSortedDrinks.length);
  }, [filteredAndSortedDrinks.length, setTotalResults]);

  if (isLoading) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
        <Header />
        <LoadingState message='Loading results...' />
      </main>
    );
  }

  if (error) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
        <Header />
        <ErrorState
          title='Error Loading Results'
          message='There was an error loading the search results. Please try again.'
        />
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        {!activeSearch ? (
          <div className='text-center text-gray-400'>
            <p className='text-lg'>Use the search bar above to find drinks</p>
          </div>
        ) : filteredAndSortedDrinks.length === 0 ? (
          <div className='text-center text-gray-400'>
            <p className='text-lg'>No drinks found matching your search criteria</p>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='grid gap-4'>
              {filteredAndSortedDrinks.map(drink => (
                <DrinkRow key={drink.idDrink} drink={drink} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
