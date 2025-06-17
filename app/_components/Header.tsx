'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NeonTitle } from './NeonTitle';
import { SearchBar } from './SearchBar';
import { SortBar } from './SortBar';
import { useEffect, useState } from 'react';
import { useCocktailStore } from '@/store';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isResultsPage = pathname === '/drinks';
  const { totalResults, activeSearch } = useCocktailStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-gray-900 backdrop-blur-sm border-b border-white/10 transition-all duration-200 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className='container mx-auto max-w-[2000px] px-4 lg:px-8'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6'>
          <div className='flex-shrink-0 w-full lg:w-auto'>
            <Link
              href='/'
              className='hover:opacity-80 transition-opacity duration-200 block text-center lg:text-left'
            >
              <NeonTitle
                size='sm'
                className={`!mb-0 transition-all duration-200 ${
                  isScrolled ? 'scale-90' : 'scale-100'
                }`}
              />
            </Link>
          </div>
          <div className='w-full lg:w-auto lg:flex-1 lg:max-w-4xl lg:ml-auto'>
            <SearchBar isHeader />
            {isResultsPage && (
              <div className='border-t border-white/10 flex items-center gap-4 mt-2 pt-4'>
                <div className='flex items-center justify-between gap-4 w-full'>
                  {activeSearch && totalResults > 0 && (
                    <div className='text-sm text-gray-400 whitespace-nowrap'>
                      Found {totalResults} {totalResults === 1 ? 'drink' : 'drinks'}
                    </div>
                  )}
                  <SortBar />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
