type NeonTitleProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function NeonTitle({ size = 'lg', className = '' }: NeonTitleProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <h1 className={`font-bold neon-font neon-glow ${sizeClasses[size]} ${className}`}>
      The Bartender App
    </h1>
  );
}
