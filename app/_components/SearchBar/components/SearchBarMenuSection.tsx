'use client';

import { CommandGroup, CommandItem } from '@/app/_components/ui/command';
import { Selection } from '../types';

type SearchBarMenuSectionProps = {
  title: string;
  items: string[];
  type: 'cocktail' | 'glass' | 'ingredient';
  onSelection: (type: 'cocktail' | 'glass' | 'ingredient', value: string) => void;
  shouldShow: boolean;
};

export function SearchBarMenuSection({
  title,
  items,
  type,
  onSelection,
  shouldShow,
}: SearchBarMenuSectionProps) {
  if (!shouldShow || items.length === 0) return null;

  return (
    <CommandGroup heading={title} className='p-2 bg-muted/50 border-b border-border'>
      {items.map(item => (
        <CommandItem
          key={`${type}-${item}`}
          onSelect={() => onSelection(type, item)}
          className='cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2'
        >
          {item}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
