'use client';

import { useCocktailData } from '@/hooks/useCocktailData';
import Link from 'next/link';
import { LoadingState } from '@/app/_components/LoadingState';
import { ErrorState } from '@/app/_components/ErrorState';
import { useRef } from 'react';

// Generate array of all letters A-Z
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function DirectoryPage() {
  const { data, isLoading, error } = useCocktailData();
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToLetter = (letter: string) => {
    const element = letterRefs.current[letter];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return <ErrorState />;
  }

  // Organize cocktails by first letter
  const cocktailsByLetter = alphabet.reduce(
    (acc, letter) => {
      const cocktails = data.cocktailData
        .filter(cocktail => cocktail.strDrink.toUpperCase().startsWith(letter))
        .sort((a, b) => a.strDrink.localeCompare(b.strDrink));
      acc[letter] = cocktails;
      return acc;
    },
    {} as Record<string, typeof data.cocktailData>,
  );

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <div className='container mx-auto max-w-[2000px] px-8 py-12'>
        <h1 className='text-4xl font-bold mb-2 text-center'>Drinks Directory</h1>
        <p className='text-gray-300 text-center mb-6'>
          Browse the complete collection of drinks alphabetically
        </p>

        {/* Jump to navigation */}
        <div className='sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 -mx-8 px-8 py-3 mb-8'>
          <div className='flex flex-wrap justify-center gap-1 md:gap-2'>
            {alphabet.map(letter => {
              const hasCocktails = cocktailsByLetter[letter].length > 0;
              return (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  disabled={!hasCocktails}
                  className={`
                    w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-medium
                    transition-all duration-200 flex items-center justify-center
                    ${
                      hasCocktails
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  title={
                    hasCocktails ? `Jump to ${letter}` : `No cocktails starting with ${letter}`
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {alphabet.map(letter => {
            const cocktails = cocktailsByLetter[letter];
            if (cocktails.length === 0) return null;

            return (
              <div
                key={letter}
                ref={(el: HTMLDivElement | null) => {
                  letterRefs.current[letter] = el;
                }}
                className='bg-gray-800/50 rounded-lg p-6 border border-gray-700 scroll-mt-24'
              >
                <div className='sticky top-28 xl:top-16 bg-gray-800/95 py-2 -mx-6 px-6 border-b border-gray-700 mb-4'>
                  <h2 className='text-2xl font-bold text-indigo-400'>{letter}</h2>
                </div>
                <ul className='space-y-2'>
                  {cocktails.map(cocktail => (
                    <li key={cocktail.idDrink}>
                      <Link
                        href={`/drink/${encodeURIComponent(cocktail.strDrink.replaceAll(' ', '-').toLowerCase())}`}
                        className='block hover:bg-gray-700/50 rounded px-2 py-1 transition-colors duration-200'
                      >
                        <span className='text-white'>{cocktail.strDrink}</span>
                        <span className='text-gray-400 text-sm ml-2'>{cocktail.strGlass}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
