'use client';

import Link from 'next/link';

// Simplified Category type - all will now use gradient
interface Category {
  name: string;
  description: string;
  slug: string;
  gradient: string;
  glow: string;
}

const categories: Category[] = [
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
  return (
    <section>
      <h2 className='mb-6 text-2xl font-semibold text-white'>Popular Categories</h2>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        {categories.map(category => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`bg-gradient-to-br border border-gray-200 hover:border-gray-300 hover:scale-105 p-6 rounded-xl transition-all duration-300 ease-in-out ${category.glow} ${category.gradient}`}
          >
            <h3 className='font-semibold mb-3 text-gray-800 text-xl'>{category.name}</h3>
            <p className='leading-relaxed text-gray-600 text-sm'>{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
