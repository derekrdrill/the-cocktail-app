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
      className='block bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 rounded-xl transition-colors duration-200'
    >
      <div className='flex gap-6 p-6'>
        <div className='relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg'>
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 128px, 128px'
          />
        </div>
        <div className='flex-grow min-w-0'>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-semibold text-white mb-1'>{drink.strDrink}</h2>
              <div className='flex items-center gap-2 text-sm text-gray-300'>
                <span className='flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-yellow-400'></span>
                  {drink.strGlass}
                </span>
                <span>•</span>
                <span>{drink.strAlcoholic || 'Alcoholic'}</span>
                <span>•</span>
                <DifficultyChip difficulty={drink.difficulty} />
              </div>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-300 mb-2'>Ingredients</h3>
              <div className='flex flex-wrap gap-2'>
                {ingredients.map((ingredient, index) => (
                  <span key={index} className='bg-white/5 px-2 py-1 rounded text-sm text-gray-300'>
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
