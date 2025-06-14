import { DifficultyChip } from '@/app/_components/DifficultyChip';
import { Cocktail } from '@/types/types';

type DrinkHeroProps = {
  drinkName: string;
  imageUrl: string;
  glassType: string;
  alcoholic: string;
  difficulty: Cocktail['difficulty'];
};

export function DrinkHero({
  drinkName,
  imageUrl,
  glassType,
  alcoholic,
  difficulty,
}: DrinkHeroProps) {
  return (
    <div className='relative h-[35vh] md:h-[45vh] w-full overflow-hidden bg-gray-800'>
      <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='relative w-full h-full max-w-4xl mx-auto'>
          <img
            src={imageUrl}
            alt={drinkName}
            className='absolute inset-0 w-full h-full object-contain md:object-cover object-center'
            style={{
              objectPosition: 'center 30%',
            }}
          />
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent'>
        <div className='container mx-auto max-w-4xl'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-lg'>
            {drinkName}
          </h1>
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <span className='px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30'>
                {glassType}
              </span>
              <span className='px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30'>
                {alcoholic}
              </span>
            </div>
            <div>
              <DifficultyChip difficulty={difficulty} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
