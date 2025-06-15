'use client';

import { useSearchBarStore } from '@/store';
import { Selection } from '@/types/types';

type SearchBarMenuSectionProps = {
  title: string;
  items: string[];
  type: 'cocktail' | 'glass' | 'ingredient';
  shouldShow: boolean;
};

export function SearchBarMenuSection({
  title,
  items,
  type,
  shouldShow,
}: SearchBarMenuSectionProps) {
  const { setIsSearchMenuOpen, setSearchQuery, setSelections, selections, searchType } =
    useSearchBarStore();

  if (!shouldShow || items.length === 0) return null;

  const handleSelection = (value: string) => {
    if (type === 'cocktail') {
      setSearchQuery(value);
      setIsSearchMenuOpen(false);
      return;
    }

    // For glass and ingredient selections (type is now guaranteed to be 'glass' or 'ingredient')
    setSearchQuery('');

    const newSelection: Selection = { type: type as 'glass' | 'ingredient', value };

    // Validate selection limits
    if (type === 'glass') {
      const hasGlass = selections.some(s => s.type === 'glass');
      if (hasGlass) {
        console.log('Only one glass type can be selected');
        return;
      }
    }

    if (type === 'ingredient') {
      const ingredientCount = selections.filter(s => s.type === 'ingredient').length;
      if (ingredientCount >= 3) {
        console.log('Maximum of 3 ingredients can be selected');
        return;
      }
    }

    // Only add if not already selected
    if (!selections.some(s => s.type === type && s.value === value)) {
      setSelections([...selections, newSelection]);
    }
  };

  return (
    <div className='border-b border-gray-100 p-2'>
      {searchType === 'All' && (
        <div className='font-medium px-2 py-1.5 text-gray-500 text-sm'>{title}</div>
      )}
      {items.map(item => (
        <button
          key={`${type}-${item}`}
          onClick={() => handleSelection(item)}
          className='hover:bg-gray-50 px-4 py-2 text-black text-left text-sm w-full'
        >
          {item}
        </button>
      ))}
    </div>
  );
}
