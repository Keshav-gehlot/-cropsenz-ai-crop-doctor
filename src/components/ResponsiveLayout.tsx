import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function ResponsiveLayout({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md'
}: ResponsiveLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-none'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-3 py-3 sm:px-4 sm:py-4',
    md: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8',
    lg: 'px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12'
  };

  return (
    <div className={`
      w-full min-h-screen
      ${maxWidth !== 'full' ? maxWidthClasses[maxWidth] : ''}
      ${paddingClasses[padding]}
      ${maxWidth !== 'full' ? 'mx-auto' : ''}
      flex flex-col
      ${className}
    `}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = ''
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  const gridCols = `
    grid-cols-${cols.mobile || 1}
    ${cols.tablet ? `md:grid-cols-${cols.tablet}` : ''}
    ${cols.desktop ? `lg:grid-cols-${cols.desktop}` : ''}
  `;

  return (
    <div className={`
      grid
      ${gridCols}
      ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  );
}

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function ResponsiveCard({
  children,
  className = '',
  hover = true
}: ResponsiveCardProps) {
  return (
    <div className={`
      bg-card border border-border rounded-xl
      p-4 sm:p-6
      ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

interface ResponsiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export function ResponsiveButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false
}: ResponsiveButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-background hover:bg-secondary/50'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm h-9',
    md: 'px-4 py-2 text-base h-11 sm:h-12',
    lg: 'px-6 py-3 text-lg h-12 sm:h-14'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/20
        disabled:opacity-50 disabled:cursor-not-allowed
        android-ripple
        ${className}
      `}
    >
      {children}
    </button>
  );
}
