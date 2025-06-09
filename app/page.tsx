import { SearchBar } from './_components/SearchBar';
import { CocktailGrid } from './_components/CocktailGrid';

export default function Index() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <div className='max-w-[2000px] mx-auto px-4 py-16'>
        <h1 className='text-5xl font-bold mb-2 neon-font neon-glow text-center'>
          The Bartender App
        </h1>
        <p className='text-xl text-center text-gray-300 mb-12'>What can I get for you?</p>
        <SearchBar />
        <CocktailGrid />
      </div>
    </main>
  );
}
