'use client';

import Link from 'next/link';
import { NeonTitle } from './NeonTitle';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className='bg-gray-900/50 backdrop-blur-sm border-b border-white/10'>
      <div className='container mx-auto max-w-[2000px] px-8 py-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex-shrink-0'>
            <Link href='/' className='hover:opacity-80 transition-opacity duration-200'>
              <NeonTitle size='sm' className='!mb-0' />
            </Link>
          </div>
          <div className='flex-grow max-w-2xl'>
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
