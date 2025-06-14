'use client';

import { useRouter } from 'next/navigation';
import { useSearchBarStore } from '@/store';
import { CocktailCategory } from '@/types/types';
import { categoryIngredientMap } from '@/constants/constants';

const categories: CocktailCategory[] = [
  {
    name: 'Vodka',
    description: 'Clear, neutral spirits perfect for mixing',
    slug: 'vodka',
    gradient: 'from-blue-50 to-blue-200',
    glow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]',
  },
  {
    name: 'Rum',
    description: 'From light to dark, perfect for tropical drinks',
    slug: 'rum',
    gradient: 'from-orange-50 to-orange-200',
    glow: 'hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]',
  },
  {
    name: 'Gin',
    description: 'Botanical spirits with complex flavors',
    slug: 'gin',
    gradient: 'from-emerald-50 to-emerald-200',
    glow: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]',
  },
  {
    name: 'Whiskey',
    description: 'Bourbon, Scotch, and more',
    slug: 'whiskey',
    gradient: 'from-amber-50 to-amber-300',
    glow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]',
  },
  {
    name: 'Tequila',
    description: 'Agave spirits from Mexico',
    slug: 'tequila',
    gradient: 'from-green-50 to-green-200',
    glow: 'hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]',
  },
  {
    name: 'Liqueurs',
    description: 'Sweet, flavored spirits for cocktails',
    slug: 'liqueur',
    gradient: 'from-purple-50 to-purple-200',
    glow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]',
  },
];

export function CocktailCategories() {
  const router = useRouter();
  const { setSearchType, setSelections, setActiveSearch } = useSearchBarStore();

  const handleCategoryClick = (e: React.MouseEvent, category: CocktailCategory) => {
    e.preventDefault(); // Prevent the default Link navigation

    // Set search type to Ingredients
    setSearchType('Ingredients');

    // Get ingredients for this category from the constants file
    const ingredients =
      categoryIngredientMap[category.slug as keyof typeof categoryIngredientMap] || [];

    // Create selections for each ingredient
    const selections = ingredients.map(ingredient => ({
      type: 'ingredient' as const,
      value: ingredient,
    }));

    // Set the selections and activate search
    setSelections(selections);
    setActiveSearch();

    // Navigate to results page
    router.push('/drinks');
  };

  return (
    <section>
      <h2 className='mb-6 text-2xl font-semibold text-white'>Popular Categories</h2>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        {categories.map(category => (
          <button
            key={category.slug}
            onClick={e => handleCategoryClick(e, category)}
            className={`bg-gradient-to-br border border-gray-200 hover:border-gray-300 hover:scale-105 p-6 rounded-xl transition-all duration-300 ease-in-out text-left w-full ${category.glow} ${category.gradient}`}
          >
            <h3 className='font-semibold mb-3 text-gray-800 text-xl'>{category.name}</h3>
            <p className='leading-relaxed text-gray-600 text-sm'>{category.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
