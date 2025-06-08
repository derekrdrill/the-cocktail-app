'use client';

import { CommandInput } from '@/app/_components/ui/command';

type SearchBarInputProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function SearchBarInput({
  searchQuery,
  onSearchChange,
  onFocus,
  onBlur,
}: SearchBarInputProps) {
  return (
    <CommandInput
      placeholder='Search cocktails, glasses, or ingredients...'
      value={searchQuery}
      onValueChange={onSearchChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
