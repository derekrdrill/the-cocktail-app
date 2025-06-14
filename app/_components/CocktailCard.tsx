'use client';

import Link from 'next/link';
import { Cocktail } from '@/types/types';
import { DifficultyChip } from './DifficultyChip';

type CocktailCardProps = {
  cocktail: Cocktail;
};

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const ingredientCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
    i => cocktail[`strIngredient${i}`],
  ).length;

  const drinkUrl = `/drink/${cocktail.strDrink.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <Link href={drinkUrl} className='block h-full'>
      <div className='h-full flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-lg p-4 transition-all duration-300 ease-in-out'>
        <div className='relative flex-shrink-0'>
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            className='w-full h-48 object-cover rounded-lg mb-4'
          />
          <div className='absolute right-2 top-2'>
            <DifficultyChip difficulty={cocktail.difficulty} />
          </div>
        </div>
        <div className='flex flex-col flex-grow'>
          <h2 className='text-xl font-semibold mb-2 text-white'>{cocktail.strDrink}</h2>
          <div className='mb-2'>
            <span className='text-sm text-gray-400'>Glass: </span>
            <span className='text-sm text-white'>{cocktail.strGlass}</span>
          </div>
          <div className='mb-3'>
            <span className='text-sm text-gray-400'>Ingredients: </span>
            <span className='text-sm text-white'>{ingredientCount}</span>
          </div>
          <p className='text-gray-400 text-sm line-clamp-3 mt-auto'>{cocktail.strInstructions}</p>
        </div>
      </div>
    </Link>
  );
}
