'use client';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strGlass: string;
  [key: string]: string | null;
}

interface CocktailCardProps {
  cocktail: Cocktail;
}

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const ingredientCount = Array.from({ length: 15 }, (_, i) => i + 1).filter(
    i => cocktail[`strIngredient${i}`],
  ).length;

  return (
    <div className='bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow'>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className='w-full h-48 object-cover rounded-lg mb-4'
      />
      <h2 className='text-xl font-semibold mb-2'>{cocktail.strDrink}</h2>
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
