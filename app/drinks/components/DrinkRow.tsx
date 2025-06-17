'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Cocktail } from '@/types/types';
import { DifficultyChip } from '@/app/_components/DifficultyChip';

type DrinkRowProps = {
  drink: Cocktail;
};

export function DrinkRow({ drink }: DrinkRowProps) {
  const ingredients = Array.from({ length: 15 }, (_, i) => i + 1)
    .map(i => ({
      name: drink[`strIngredient${i}`],
      measure: drink[`strMeasure${i}`],
    }))
    .filter((ing): ing is { name: string; measure: string | null } => ing.name !== null);

  return (
    <Link
      href={`/drink/${drink.strDrink.replaceAll(' ', '-')}`}
      className='block bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 rounded-xl transition-colors duration-200 w-full'
    >
      <div className='flex gap-3 sm:gap-6 p-3 sm:p-6'>
        <div className='relative h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-lg'>
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 80px, 128px'
          />
        </div>
        <div className='flex-grow min-w-0'>
          <div className='space-y-2 sm:space-y-4'>
            <div>
              <h2 className='text-lg sm:text-xl font-semibold text-white mb-1 break-words'>
                {drink.strDrink}
              </h2>
              <div className='flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300'>
                <span className='flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-yellow-400'></span>
                  <span className='truncate'>{drink.strGlass}</span>
                </span>
                <span className='hidden sm:inline'>•</span>
                <span className='truncate'>{drink.strAlcoholic || 'Alcoholic'}</span>
                <span className='hidden sm:inline'>•</span>
                <DifficultyChip difficulty={drink.difficulty} />
              </div>
            </div>
            <div>
              <h3 className='text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2'>
                Ingredients
              </h3>
              <div className='flex flex-wrap gap-1 sm:gap-2'>
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className='bg-white/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm text-gray-300 max-w-full truncate'
                  >
                    {ingredient.measure ? `${ingredient.measure} ` : ''}
                    {ingredient.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
