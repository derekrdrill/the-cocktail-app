type DrinkTagsProps = {
  tags: string[];
};

export function DrinkTags({ tags }: DrinkTagsProps) {
  if (!tags.length) return null;

  return (
    <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
      <h3 className='text-xl font-semibold mb-4 text-yellow-400'>Tags</h3>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
          <span
            key={index}
            className='px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors duration-200'
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
