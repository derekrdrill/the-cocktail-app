'use client';

import { X } from 'lucide-react';
import { Selection } from '@/types/types';

type SearchBarChipProps = {
  label: string;
  selection: Selection;
  handleRemoveSelection: (selectionToRemove: Selection) => void;
};

export function SearchBarChip({ label, selection, handleRemoveSelection }: SearchBarChipProps) {
  return (
    <div className='bg-gray-100 border border-gray-200 flex h-7 items-center px-3 rounded-full text-sm hover:bg-gray-200 transition-colors'>
      <span className='text-gray-700' title={label}>
        {label}
      </span>
      <button
        onClick={() => handleRemoveSelection(selection)}
        className='ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0'
        aria-label={`Remove ${label}`}
      >
        <X className='h-3 w-3' />
      </button>
    </div>
  );
}
