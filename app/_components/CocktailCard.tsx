'use client';

import Link from 'next/link';
import { Cocktail } from '@/types/types';

type CocktailCardProps = {
  cocktail: Cocktail;
};

function getDifficultyColor(difficulty: Cocktail['difficulty']): string {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-500';
    case 'Intermediate':
      return 'bg-yellow-500';
    case 'Advanced':
      return 'bg-red-500';
  }
}

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const ingredientCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
    i => cocktail[`strIngredient${i}`],
  ).length;

  return (
    <div className='cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-lg p-4 transition-all duration-300 ease-in-out'>
      <div className='relative'>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className='cursor-pointer w-full h-48 object-cover rounded-lg mb-4'
        />
        <div
          className={`absolute right-2 top-2 ${getDifficultyColor(cocktail.difficulty)} px-2 py-1 rounded-full text-xs font-medium text-white`}
        >
          {cocktail.difficulty}
        </div>
      </div>
      <h2 className='text-xl font-semibold mb-2 text-white'>{cocktail.strDrink}</h2>
      <div className='mb-2'>
        <span className='text-sm text-gray-400'>Glass: </span>
        <span className='text-sm text-white'>{cocktail.strGlass}</span>
      </div>
      <div className='mb-3'>
        <span className='text-sm text-gray-400'>Ingredients: </span>
        <span className='text-sm text-white'>{ingredientCount}</span>
      </div>
      <p className='text-gray-400 text-sm line-clamp-3'>{cocktail.strInstructions}</p>
    </div>
  );
}
