import { memo, useState, useEffect, useCallback } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  Leaf, 
  Settings, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff,
  Battery,
  Signal
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface OptimizedHeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  onMenuToggle?: () => void;
  variant?: 'default' | 'minimal' | 'extended';
  className?: string;
}

interface SystemStatus {
  online: boolean;
  battery: number;
  signal: number;
  lastSync: Date;
}

const OptimizedHeader = memo(function OptimizedHeader({
  title,
  showSearch = true,
  showNotifications = true,
  showMenu = false,
  onMenuToggle,
  variant = 'default',
  className = ''
}: OptimizedHeaderProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    online: navigator.onLine,
    battery: 100,
    signal: 100,
    lastSync: new Date()
  });
  const [notifications] = useState(3);

  // Monitor system status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setSystemStatus(prev => ({
        ...prev,
        online: navigator.onLine,
        lastSync: navigator.onLine ? new Date() : prev.lastSync
      }));
    };

    // Monitor battery (if supported)
    const updateBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          setSystemStatus(prev => ({
            ...prev,
            battery: Math.round(battery.level * 100)
          }));
        } catch (error) {
          // Battery API not supported
        }
      }
    };

    // Monitor connection quality
    const updateConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection?.effectiveType || '4g';
        const signalMap: Record<string, number> = {
          'slow-2g': 25,
          '2g': 50,
          '3g': 75,
          '4g': 100
        };
        const signalStrength = signalMap[effectiveType] || 100;
        
        setSystemStatus(prev => ({
          ...prev,
          signal: signalStrength
        }));
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateBattery();
    updateConnection();

    const interval = setInterval(() => {
      updateBattery();
      updateConnection();
    }, 30000);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  // Check dark mode preference
  useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      setIsDarkMode(htmlElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchVisible(prev => !prev);
    if (!searchVisible) {
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        searchInput?.focus();
      }, 100);
    }
  }, [searchVisible]);

  const toggleDarkMode = useCallback(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
      // Implement search functionality
    }
  }, [searchQuery]);

  const renderSystemStatus = () => (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {systemStatus.online ? (
        <Wifi className="h-3 w-3 text-green-500" />
      ) : (
        <WifiOff className="h-3 w-3 text-red-500" />
      )}
      
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <span>{systemStatus.signal}%</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Battery className="h-3 w-3" />
        <span>{systemStatus.battery}%</span>
      </div>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <header className={`flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm ${className}`}>
        <div className="flex items-center gap-3">
          <Leaf className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">{title || 'CropSenz'}</h1>
        </div>
        <LanguageSwitcher variant="primary" />
      </header>
    );
  }

  if (variant === 'extended') {
    return (
      <header className={`space-y-4 p-4 border-b bg-background/95 backdrop-blur-sm ${className}`}>
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showMenu && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuToggle}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">{title || 'CropSenz'}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {renderSystemStatus()}
            <LanguageSwitcher variant="primary" />
          </div>
        </div>

        {/* Search and actions row */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="relative"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            {showNotifications && (
              <Button
                variant="ghost"
                size="sm"
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {notifications > 9 ? '9+' : notifications}
                  </Badge>
                )}
              </Button>
            )}
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Default variant
  return (
    <header className={`flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-3">
        {showMenu && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <Leaf className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold">{title || 'CropSenz'}</h1>
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <>
            {searchVisible ? (
              <div className="flex items-center gap-2 animate-in slide-in-from-right-5">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 pr-10"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </form>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {showNotifications && (
          <Button
            variant="ghost"
            size="sm"
            className="relative"
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {notifications > 9 ? '9+' : notifications}
              </Badge>
            )}
          </Button>
        )}

        <LanguageSwitcher />
      </div>
    </header>
  );
});

export default OptimizedHeader;