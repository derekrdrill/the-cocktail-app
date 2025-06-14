'use client';
import { SearchBarChip } from './SearchBarChip';
import { useSearchBarStore } from '@/store';
import { Tooltip } from '@/app/_components/Tooltip';

export function SearchBarChips() {
  const { selections } = useSearchBarStore();

  // If we have 3 or fewer selections, show them all
  if (selections.length <= 3) {
    return selections.map(selection => (
      <SearchBarChip
        key={`${selection.type}-${selection.value}`}
        label={selection.value}
        selection={selection}
      />
    ));
  }

  // If we have more than 3 selections, show the first 3 and a count chip
  const visibleSelections = selections.slice(0, 3);
  const hiddenSelections = selections.slice(3);
  const remainingCount = hiddenSelections.length;

  return (
    <>
      {visibleSelections.map(selection => (
        <SearchBarChip
          key={`${selection.type}-${selection.value}`}
          label={selection.value}
          selection={selection}
        />
      ))}
      <Tooltip
        title='Additional selections'
        content={
          <ul className='list-disc list-inside'>
            {hiddenSelections.map(selection => (
              <li key={`${selection.type}-${selection.value}`}>{selection.value}</li>
            ))}
          </ul>
        }
      >
        <div className='bg-gray-100 border border-gray-200 flex h-6 items-center px-2 rounded-full text-gray-600 text-sm cursor-help'>
          +{remainingCount}
        </div>
      </Tooltip>
    </>
  );
}
