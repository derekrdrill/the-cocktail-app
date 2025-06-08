import { CocktailGrid } from './_components/CocktailGrid';
import { SearchBar } from './_components/SearchBar';

export default function Index() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <div className='max-w-[2000px] mx-auto px-4 py-16'>
        <h1 className='text-5xl font-bold mb-8 text-center'>The Cocktail App</h1>
        <p className='text-xl text-center text-gray-300 mb-12'>
          Discover and create amazing cocktails
        </p>
        <SearchBar />
        <CocktailGrid />
      </div>
    </main>
  );
}
