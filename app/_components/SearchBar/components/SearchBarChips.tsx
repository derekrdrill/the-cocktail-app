'use client';
import { SearchBarChip } from './SearchBarChip';
import { useSearchBarStore } from '@/store';

export function SearchBarChips() {
  const { selections } = useSearchBarStore();

  return selections.map(selection => (
    <SearchBarChip
      key={`${selection.type}-${selection.value}`}
      label={selection.value}
      selection={selection}
    />
  ));
}
