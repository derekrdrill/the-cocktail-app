import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type DirectoryLinkProps = {
  variant?: 'default' | 'compact' | 'gradient';
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
};

export function DirectoryLink({
  variant = 'default',
  className = '',
  showIcon = true,
  iconSize = 20,
}: DirectoryLinkProps) {
  const variants = {
    default:
      'px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-200 text-sm font-medium',
    compact:
      'px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 rounded-lg transition-colors duration-200 text-sm font-medium',
    gradient:
      'px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-indigo-500/25',
  };

  const iconClasses = {
    default: '',
    compact: '',
    gradient: 'group-hover:scale-110 transition-transform duration-300',
  };

  return (
    <Link
      href='/drinks/directory'
      className={`group flex items-center gap-2 ${variants[variant]} ${className}`}
    >
      {showIcon && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={iconSize}
          height={iconSize}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={iconClasses[variant]}
        >
          <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
          <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
        </svg>
      )}
      Directory
    </Link>
  );
}
