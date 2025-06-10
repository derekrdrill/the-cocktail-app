'use client';

import { useEffect } from 'react';
import { useSearchBarStore } from '@/store';
import { useCocktailData } from '@/hooks/useCocktailData';
import { Header } from '../_components/Header';

export default function DrinksPage() {
  const { data } = useCocktailData();
  const setCocktailsData = useSearchBarStore(state => state.setCocktailsData);

  useEffect(() => {
    if (data) {
      setCocktailsData({
        cocktailNames: data.cocktailNames,
        glassTypes: data.glassTypes,
        ingredients: data.ingredients,
      });
    }
  }, [data, setCocktailsData]);

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <Header />
      <div className='container mx-auto max-w-[2000px] px-8 py-8'>
        {/* Content will be added later */}
      </div>
    </main>
  );
}
