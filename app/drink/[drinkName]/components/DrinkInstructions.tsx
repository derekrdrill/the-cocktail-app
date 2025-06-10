type DrinkInstructionsProps = {
  instructions: string;
};

export function DrinkInstructions({ instructions }: DrinkInstructionsProps) {
  return (
    <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
      <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
        <span className='text-yellow-400'>Instructions</span>
      </h2>
      <div className='prose prose-invert max-w-none'>
        <p className='text-gray-300 leading-relaxed text-lg'>{instructions}</p>
      </div>
    </div>
  );
}
