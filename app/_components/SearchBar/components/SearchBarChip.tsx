'use client';

import { X } from 'lucide-react';
import { useSearchBarStore } from '@/store';
import { Selection } from '@/types/types';

type SearchBarChipProps = {
  label: string;
  selection: Selection;
};

export const handleRemoveSelection = ({
  allSelections,
  selectionToRemove,
  setSelections,
}: {
  allSelections: Selection[];
  selectionToRemove: Selection;
  setSelections: (selections: Selection[]) => void;
}) => {
  setSelections(
    allSelections.filter(
      s => !(s.type === selectionToRemove.type && s.value === selectionToRemove.value),
    ),
  );
};

export function SearchBarChip({ label, selection }: SearchBarChipProps) {
  const { selections, setSelections } = useSearchBarStore();

  return (
    <div className='bg-gray-100 border border-gray-200 flex h-6 items-center px-2 rounded-full text-sm'>
      <span className='text-gray-700'>{label}</span>
      <button
        onClick={() =>
          handleRemoveSelection({
            allSelections: selections,
            selectionToRemove: selection,
            setSelections,
          })
        }
        className='ml-1 text-gray-500 hover:text-gray-700'
        aria-label={`Remove ${label}`}
      >
        <X className='h-3 w-3' />
      </button>
    </div>
  );
}
