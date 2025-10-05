import React from 'react';
import { ArrowLeft, Bell, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useResponsive } from './hooks/useResponsive';
import LanguageSwitcher from './LanguageSwitcher';
import { Screen } from '../App';

interface ResponsiveHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNavigate?: (screen: Screen) => void;
  showProfile?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  className?: string;
}

export function ResponsiveHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  onNavigate,
  showProfile = true,
  showNotifications = true,
  showSettings = true,
  className = ''
}: ResponsiveHeaderProps) {
  const { isMobile } = useResponsive();

  return (
    <div
      className={`
        relative overflow-hidden bg-primary
        ${isMobile ? 'px-4 py-6' : 'px-6 py-8 lg:px-8 lg:py-10'}
        ${isMobile ? 'rounded-b-3xl' : 'rounded-b-3xl lg:rounded-b-[2rem]'}
        w-full shadow-xl
        ${className}
      `}
    >
      {}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-1/4 left-0 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        {!isMobile && (
          <>
            <div className="absolute top-0 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-white/8 rounded-full blur-xl"></div>
          </>
        )}
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between min-h-[48px]">
          {}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {showBack && onBack && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20 flex-shrink-0 android-ripple rounded-2xl transition-all duration-300 hover:scale-110"
                onClick={onBack}
              >
                <ArrowLeft className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </Button>
            )}

            <div className="flex-1 min-w-0">
              <h1 className={`
                font-semibold truncate text-primary-foreground
                ${isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'}
                drop-shadow-sm
              `}>
                {title}
              </h1>
              {subtitle && (
                <p className={`
                  text-primary-foreground/90 truncate
                  ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}
                  mt-1 drop-shadow-sm
                `}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons with language switcher */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <div className="text-primary-foreground">
              <LanguageSwitcher />
            </div>

            {showNotifications && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20 android-ripple rounded-2xl transition-all duration-300 hover:scale-110 relative"
              >
                <Bell className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                {}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-primary"></div>
              </Button>
            )}

            {showSettings && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20 android-ripple rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <Settings className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </Button>
            )}

            {showProfile && onNavigate && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20 p-1 android-ripple rounded-2xl transition-all duration-300 hover:scale-110"
                onClick={() => onNavigate('profile')}
              >
                <div className="relative">
                  <Avatar className={`${isMobile ? 'w-9 h-9' : 'w-11 h-11'} border-2 border-white/30 shadow-lg`}>
                    <AvatarFallback className="bg-white/20 text-primary-foreground font-semibold">
                      <User className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                    </AvatarFallback>
                  </Avatar>
                  {}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-primary"></div>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface BreadcrumbProps {
  items: Array<{
    label: string;
    screen?: Screen;
  }>;
  onNavigate?: (screen: Screen) => void;
  className?: string;
}

export function Breadcrumb({ items, onNavigate, className = '' }: BreadcrumbProps) {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return null;
  }

  return (
    <div className={`
      container-responsive max-w-7xl mx-auto
      py-3 px-6 lg:px-8
      border-b border-border/50
      ${className}
    `}>
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-muted-foreground/50">/</span>
            )}
            {item.screen && onNavigate ? (
              <button
                onClick={() => onNavigate(item.screen!)}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className={index === items.length - 1 ? 'text-foreground font-medium' : ''}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
