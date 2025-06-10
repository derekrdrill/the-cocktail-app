type Ingredient = {
  name: string;
  measure: string | null;
};

interface DrinkIngredientsProps {
  ingredients: Ingredient[];
}

export function DrinkIngredients({ ingredients }: DrinkIngredientsProps) {
  return (
    <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
      <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
        <span className='text-yellow-400'>Ingredients</span>
        <span className='text-sm text-gray-400'>({ingredients.length})</span>
      </h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className='flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200'
          >
            <span className='w-8 h-8 flex items-center justify-center bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium'>
              {index + 1}
            </span>
            <div>
              <span className='text-white font-medium'>{ingredient.name}</span>
              {ingredient.measure && (
                <span className='block text-sm text-gray-400'>{ingredient.measure}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
