'use client';
import { useCocktailStore } from '@/store';
import { Selection } from '@/types/types';

import { Tooltip } from '@/app/_components/Tooltip';
import { SearchBarChip } from './SearchBarChip';
import { X } from 'lucide-react';

export function SearchBarChips() {
  const { selections, setSelections } = useCocktailStore();

  const handleRemoveSelection = (selectionToRemove: Selection) => {
    setSelections(
      selections.filter(
        s => !(s.type === selectionToRemove.type && s.value === selectionToRemove.value),
      ),
    );
  };

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;

    if (window.innerWidth < 640) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  };

  const visibleCount = getVisibleCount();

  const visibleSelections = selections.slice(0, visibleCount);
  const hiddenSelections = selections
    .slice(visibleCount)
    .sort((a, b) => a.value.localeCompare(b.value)); // Sort alphabetically
  const remainingCount = hiddenSelections.length;

  if (selections.length === 0) {
    return null;
  }

  if (selections.length <= visibleCount) {
    return (
      <>
        {selections.map(selection => (
          <SearchBarChip
            key={`${selection.type}-${selection.value}`}
            label={selection.value}
            selection={selection}
            handleRemoveSelection={handleRemoveSelection}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {visibleSelections.map(selection => (
        <SearchBarChip
          key={`${selection.type}-${selection.value}`}
          label={selection.value}
          selection={selection}
          handleRemoveSelection={handleRemoveSelection}
        />
      ))}
      <Tooltip
        title='Additional selections'
        content={
          <div className='max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
            <ul className='list-none space-y-1'>
              {hiddenSelections.map(selection => (
                <li
                  key={`${selection.type}-${selection.value}`}
                  className='flex items-center justify-between gap-2 py-1 px-1 hover:bg-gray-100 hover:text-black text-white rounded transition-colors'
                >
                  <span className='text-sm'>{selection.value}</span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleRemoveSelection(selection);
                    }}
                    className='p-1 hover:bg-gray-200 rounded-full transition-colors'
                    title='Remove selection'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div
          className='bg-gray-100 border border-gray-200 flex h-6 items-center px-2 rounded-full text-gray-600 text-sm cursor-pointer hover:bg-gray-200 transition-colors'
          title='Click to see more ingredients'
        >
          +{remainingCount}
        </div>
      </Tooltip>
    </>
  );
}
