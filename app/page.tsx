import { SearchBar } from './_components/SearchBar';
import { CocktailGrid } from './_components/CocktailGrid';
import { CocktailCategories } from './_components/CocktailCategories';
import { AnimatedMartiniPattern } from './_components/AnimatedMartiniPattern';
import { AnimatedMartiniPatternMobile } from './_components/AnimatedMartiniPatternMobile';
import { NeonTitle } from './_components/NeonTitle';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative z-10'>
      <div className='container mx-auto max-w-[2000px] px-8 relative z-20'>
        <div className='py-16 relative overflow-hidden'>
          <div className='hidden sm:block'>
            <AnimatedMartiniPattern />
          </div>
          <div className='sm:hidden'>
            <AnimatedMartiniPatternMobile />
          </div>
          <NeonTitle className='text-center' />
          <p className='mb-8 text-center text-gray-300 relative'>What can I get for you?</p>
        </div>
        <SearchBar />
        <div className='flex flex-col gap-12'>
          <CocktailCategories />
          <CocktailGrid />
        </div>
      </div>
    </main>
  );
}
