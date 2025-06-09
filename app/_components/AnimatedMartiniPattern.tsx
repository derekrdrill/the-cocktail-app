'use client';

export function AnimatedMartiniPattern() {
  return (
    <div className='absolute inset-0 opacity-[0.05] pointer-events-none'>
      <div className='absolute inset-0 animate-float-slow'>
        <svg className='w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <defs>
            <pattern
              id='martini-pattern'
              x='0'
              y='0'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              {/* Glow effect */}
              <filter id='glow'>
                <feGaussianBlur stdDeviation='0.5' result='coloredBlur' />
                <feMerge>
                  <feMergeNode in='coloredBlur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
              {/* Classic Martini Glass */}
              <path
                d='M6 3 L14 3 L10 12 Z M10 12 L10 18 M8 18 L12 18'
                fill='none'
                stroke='currentColor'
                strokeWidth='0.25'
                strokeLinecap='round'
                filter='url(#glow)'
              />
            </pattern>
          </defs>
          <rect x='0' y='0' width='100' height='100' fill='url(#martini-pattern)' />
        </svg>
      </div>
    </div>
  );
}
