import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface EnhancedCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'default' | 'gradient' | 'glass' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  headerAction?: React.ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info';
}

export function EnhancedCard({
  title,
  subtitle,
  children,
  icon: Icon,
  variant = 'default',
  size = 'md',
  hover = true,
  className = '',
  headerAction,
  status
}: EnhancedCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-card via-card to-secondary/20 border-primary/20 shadow-lg';
      case 'glass':
        return 'glass-card border-card-border';
      case 'outlined':
        return 'bg-transparent border-2 border-primary/30 hover:border-primary/50';
      default:
        return 'glass-card';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-3';
      case 'lg':
        return 'p-6 lg:p-8';
      default:
        return 'p-4 lg:p-6';
    }
  };

  const getStatusClasses = () => {
    if (!status) return '';

    switch (status) {
      case 'success':
        return 'border-l-4 border-l-success bg-success/5';
      case 'warning':
        return 'border-l-4 border-l-warning bg-warning/5';
      case 'error':
        return 'border-l-4 border-l-destructive bg-destructive/5';
      case 'info':
        return 'border-l-4 border-l-info bg-info/5';
      default:
        return '';
    }
  };

  return (
    <Card
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getStatusClasses()}
        ${hover ? 'card-hover' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {(title || subtitle || Icon || headerAction) && (
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && (
                <div className={`
                  p-2 rounded-xl
                  ${status === 'success' ? 'bg-success/20 text-success' : ''}
                  ${status === 'warning' ? 'bg-warning/20 text-warning' : ''}
                  ${status === 'error' ? 'bg-destructive/20 text-destructive' : ''}
                  ${status === 'info' ? 'bg-info/20 text-info' : ''}
                  ${!status ? 'bg-primary/20 text-primary' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <CardTitle className={`
                    truncate
                    ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'}
                  `}>
                    {title}
                  </CardTitle>
                )}
                {subtitle && (
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {headerAction && (
              <div className="flex-shrink-0 ml-2">
                {headerAction}
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={title || subtitle || Icon || headerAction ? 'pt-0' : ''}>
        {children}
      </CardContent>
    </Card>
  );
}

interface ActionCardProps extends Omit<EnhancedCardProps, 'children'> {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export function ActionCard({
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ...props
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full text-left
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'animate-pulse' : ''}
        focus-ring rounded-2xl
        ${className}
      `}
    >
      <EnhancedCard
        {...props}
        hover={!disabled && !loading}
        className="android-ripple"
      >
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="loading-spinner"></div>
            <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
          </div>
        ) : (
          props.children
        )}
      </EnhancedCard>
    </button>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className = ''
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <EnhancedCard
      variant="glass"
      className={`relative overflow-hidden ${className}`}
    >
      {}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
          {Icon && (
            <div className="p-3 bg-primary/20 text-primary rounded-2xl">
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>

        {(subtitle || trendValue) && (
          <div className="flex items-center justify-between text-sm">
            {subtitle && (
              <span className="text-muted-foreground">{subtitle}</span>
            )}
            {trendValue && trend && (
              <span className={`flex items-center gap-1 font-medium ${getTrendColor()}`}>
                <span>{getTrendIcon()}</span>
                {trendValue}
              </span>
            )}
          </div>
        )}
      </div>
    </EnhancedCard>
  );
}
