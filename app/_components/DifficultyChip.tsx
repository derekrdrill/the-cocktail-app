import { Cocktail } from '@/types/types';

type DifficultyChipProps = {
  difficulty: Cocktail['difficulty'];
};

function getDifficultyColor(difficulty: Cocktail['difficulty']): string {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-500 text-gray-100';
    case 'Intermediate':
      return 'bg-yellow-500 text-gray-100';
    case 'Advanced':
      return 'bg-red-500 text-gray-100';
  }
}
export function DifficultyChip({ difficulty }: DifficultyChipProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}
    >
      {difficulty}
    </span>
  );
}
