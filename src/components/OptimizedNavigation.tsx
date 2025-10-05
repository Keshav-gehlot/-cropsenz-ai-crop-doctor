import { memo, useMemo } from 'react';
import { Home, Camera, BarChart3, History, ShoppingBag, User, Warehouse } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useOptimizedNavigation } from '../hooks/useOptimizedNavigation';
import { useLanguage } from '../contexts/LanguageContext';

interface OptimizedNavigationProps {
  variant?: 'desktop' | 'mobile';
  showLabels?: boolean;
  showBadges?: boolean;
  className?: string;
}

const navigationItems = [
  {
    id: 'home',
    label: 'home',
    icon: 'Home',
    path: '/',
    preload: true,
    priority: 'high' as const
  },
  {
    id: 'diagnosis',
    label: 'diagnosis',
    icon: 'Camera',
    path: '/diagnosis',
    preload: true,
    priority: 'high' as const
  },
  {
    id: 'grading',
    label: 'grading',
    icon: 'BarChart3',
    path: '/grading',
    preload: true,
    priority: 'medium' as const
  },
  {
    id: 'storage',
    label: 'storage',
    icon: 'Warehouse',
    path: '/storage',
    preload: true,
    priority: 'medium' as const
  },
  {
    id: 'history',
    label: 'history',
    icon: 'History',
    path: '/history',
    preload: false,
    priority: 'low' as const
  },
  {
    id: 'market',
    label: 'market',
    icon: 'ShoppingBag',
    path: '/market',
    preload: false,
    priority: 'low' as const
  },
  {
    id: 'profile',
    label: 'profile',
    icon: 'User',
    path: '/profile',
    preload: false,
    priority: 'low' as const
  }
];

const iconMap = {
  Home,
  Camera,
  BarChart3,
  Warehouse,
  History,
  ShoppingBag,
  User
};

const OptimizedNavigation = memo(function OptimizedNavigation({
  variant = 'mobile',
  showLabels = true,
  showBadges = false,
  className = ''
}: OptimizedNavigationProps) {
  const { t } = useLanguage();
  
  const {
    navigateTo,
    isNavigating,
    handleItemHover,
    isItemActive,
    isItemPreloaded,
    getNavigationStats
  } = useOptimizedNavigation(navigationItems, {
    enablePreloading: true,
    preloadDelay: 500,
    maxPreloadItems: 4
  });

  const stats = useMemo(() => getNavigationStats(), [getNavigationStats]);

  const handleNavigation = async (path: string) => {
    if (isNavigating) return;
    await navigateTo(path);
  };

  const renderNavigationItem = (item: typeof navigationItems[0]) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
    const isActive = isItemActive(item.path);
    const isPreloaded = isItemPreloaded(item.id);
    
    const buttonContent = (
      <div className="flex flex-col items-center gap-1 relative">
        <div className="relative">
          <IconComponent 
            className={`h-5 w-5 transition-colors ${
              isActive 
                ? 'text-primary' 
                : 'text-muted-foreground group-hover:text-foreground'
            }`} 
          />
          {showBadges && isPreloaded && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </div>
        {showLabels && (
          <span className={`text-xs transition-colors ${
            isActive 
              ? 'text-primary font-medium' 
              : 'text-muted-foreground group-hover:text-foreground'
          }`}>
            {t(item.label)}
          </span>
        )}
      </div>
    );

    if (variant === 'desktop') {
      return (
        <Button
          key={item.id}
          variant={isActive ? 'default' : 'ghost'}
          size="sm"
          className={`w-full justify-start gap-3 group ${
            isActive ? 'bg-primary/10 text-primary' : ''
          }`}
          onClick={() => handleNavigation(item.path)}
          onMouseEnter={() => handleItemHover(item.id)}
          disabled={isNavigating}
        >
          <IconComponent className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
          {t(item.label)}
          {showBadges && isPreloaded && (
            <Badge variant="secondary" className="ml-auto text-xs">
              Ready
            </Badge>
          )}
        </Button>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        size="sm"
        className={`flex-1 group transition-all duration-200 ${
          isActive 
            ? 'text-primary bg-primary/5' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
        }`}
        onClick={() => handleNavigation(item.path)}
        onMouseEnter={() => handleItemHover(item.id)}
        onFocus={() => handleItemHover(item.id)}
        disabled={isNavigating}
      >
        {buttonContent}
      </Button>
    );
  };

  if (variant === 'desktop') {
    return (
      <nav className={`space-y-2 ${className}`}>
        {navigationItems.map(renderNavigationItem)}
        
        {showBadges && process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-2 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Debug: {stats.preloadedCount}/{navigationItems.length} preloaded
            </p>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className={`flex bg-background/95 backdrop-blur-sm border-t border-border ${className}`}>
      {navigationItems.slice(0, 5).map(renderNavigationItem)}
      
      {isNavigating && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
        </div>
      )}
    </nav>
  );
});

export default OptimizedNavigation;