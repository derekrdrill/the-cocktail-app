'use client';

import { useState, useRef, useEffect } from 'react';

type TooltipProps = {
  children: React.ReactNode;
  title?: string;
  content: React.ReactNode;
};

export function Tooltip({ children, title, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block'>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className='absolute z-50 min-w-[200px] max-w-[300px] bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm'
          style={{
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Arrow */}
          <div
            className='absolute w-2 h-2 bg-gray-900 rotate-45'
            style={{
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          {title && <div className='font-semibold mb-1'>{title}</div>}
          <div className='whitespace-normal'>{content}</div>
        </div>
      )}
    </div>
  );
}
