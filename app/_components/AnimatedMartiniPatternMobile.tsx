'use client';

export function AnimatedMartiniPatternMobile() {
  return (
    <div className='absolute inset-0 opacity-[0.05] pointer-events-none'>
      <div className='absolute inset-0 animate-float-slow'>
        <svg className='w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <defs>
            <pattern
              id='martini-pattern-mobile'
              x='0'
              y='0'
              width='33'
              height='33'
              patternUnits='userSpaceOnUse'
            >
              {/* Glow effect */}
              <filter id='glow-mobile'>
                <feGaussianBlur stdDeviation='0.5' result='coloredBlur' />
                <feMerge>
                  <feMergeNode in='coloredBlur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
              {/* Classic Martini Glass */}
              <path
                d='M5 5 L28 5 L16.5 20 Z M16.5 20 L16.5 26 M13 26 L20 26'
                fill='none'
                stroke='currentColor'
                strokeWidth='0.25'
                strokeLinecap='round'
                filter='url(#glow-mobile)'
              />
            </pattern>
          </defs>
          <rect x='0' y='0' width='100' height='100' fill='url(#martini-pattern-mobile)' />
        </svg>
      </div>
    </div>
  );
}
