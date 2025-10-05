import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { LucideIcon } from 'lucide-react';

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  rounded = 'lg',
  className = '',
  disabled,
  ...props
}: EnhancedButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary android-ripple';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-secondary-foreground/20 android-ripple';
      case 'outline':
        return 'border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10 text-primary android-ripple';
      case 'ghost':
        return 'hover:bg-secondary/50 text-foreground android-ripple';
      case 'destructive':
        return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground android-ripple';
      case 'success':
        return 'bg-success hover:bg-success/90 text-success-foreground android-ripple';
      case 'gradient':
        return 'bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-lg android-ripple';
      default:
        return 'btn-primary android-ripple';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm h-9 min-w-[2.25rem]';
      case 'lg':
        return 'px-6 py-3 text-lg h-12 min-w-[3rem]';
      case 'xl':
        return 'px-8 py-4 text-xl h-14 min-w-[3.5rem]';
      default:
        return 'px-4 py-2.5 text-base h-11 min-w-[2.75rem]';
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case 'sm':
        return 'rounded-lg';
      case 'md':
        return 'rounded-xl';
      case 'lg':
        return 'rounded-2xl';
      case 'xl':
        return 'rounded-3xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-xl';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Button
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getRoundedClasses()}
        ${fullWidth ? 'w-full' : ''}
        font-medium transition-all duration-300
        focus-ring
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
        ${loading ? 'relative' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && (
          <div className="loading-spinner w-4 h-4"></div>
        )}

        {!loading && Icon && iconPosition === 'left' && (
          <Icon className={`
            ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'}
          `} />
        )}

        {!loading && children && (
          <span className="font-medium">{children}</span>
        )}

        {!loading && Icon && iconPosition === 'right' && (
          <Icon className={`
            ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'}
          `} />
        )}
      </div>
    </Button>
  );
}

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  badge?: string | number;
}

export function FloatingActionButton({
  icon: Icon,
  onClick,
  variant = 'primary',
  size = 'md',
  position = 'bottom-right',
  className = '',
  disabled = false,
  loading = false,
  badge
}: FloatingActionButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-14 h-14';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        fab
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getPositionClasses()}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        android-ripple focus-ring
        relative
        ${className}
      `}
    >
      {loading ? (
        <div className="loading-spinner w-5 h-5"></div>
      ) : (
        <Icon className={`
          ${size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'}
        `} />
      )}

      {badge && !loading && (
        <div className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
          {badge}
        </div>
      )}
    </button>
  );
}

interface ButtonGroupProps {
  children: React.ReactNode;
  variant?: 'attached' | 'spaced';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ButtonGroup({
  children,
  variant = 'attached',
  orientation = 'horizontal',
  className = ''
}: ButtonGroupProps) {
  const getClasses = () => {
    if (variant === 'spaced') {
      return orientation === 'horizontal'
        ? 'flex gap-2'
        : 'flex flex-col gap-2';
    }

    return orientation === 'horizontal'
      ? 'inline-flex rounded-xl overflow-hidden'
      : 'inline-flex flex-col rounded-xl overflow-hidden';
  };

  return (
    <div className={`${getClasses()} ${className}`}>
      {children}
    </div>
  );
}
