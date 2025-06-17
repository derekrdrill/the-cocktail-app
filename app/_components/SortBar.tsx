import { useCocktailStore } from '@/store';
import { SortOption } from '@/types/types';

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Alphabetical (A-Z)', value: 'name-asc' },
  { label: 'Alphabetical (Z-A)', value: 'name-desc' },
  { label: 'Ingredients (Low to High)', value: 'ingredients-asc' },
  { label: 'Ingredients (High to Low)', value: 'ingredients-desc' },
  { label: 'Difficulty (Low to High)', value: 'difficulty-asc' },
  { label: 'Difficulty (High to Low)', value: 'difficulty-desc' },
];

export function SortBar() {
  const { activeSearch, setSortOption, sortOption } = useCocktailStore();

  if (!activeSearch) return null;

  return (
    <div className='flex items-center gap-4'>
      <span className='text-sm text-gray-300'>Sort by:</span>
      <select
        value={sortOption}
        onChange={e => setSortOption(e.target.value as SortOption)}
        className='bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
