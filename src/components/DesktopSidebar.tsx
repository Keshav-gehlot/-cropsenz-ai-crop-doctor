import { Home, Camera, TrendingUp, Zap, History, User, BookOpen, Warehouse } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Screen } from '../App';

interface DesktopSidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function DesktopSidebar({ currentScreen, onNavigate }: DesktopSidebarProps) {
  const { t } = useLanguage();
  
  const navigationItems = [
    {
      id: 'home' as Screen,
      label: t('nav.dashboard'),
      icon: Home,
      description: t('nav.dashboard')
    },
    {
      id: 'diagnosis' as Screen,
      label: t('nav.diagnosis'),
      icon: Camera,
      description: t('nav.diagnosis')
    },
    {
      id: 'grading' as Screen,
      label: t('nav.grading'),
      icon: Zap,
      description: t('nav.grading')
    },
    {
      id: 'market' as Screen,
      label: t('nav.market'),
      icon: TrendingUp,
      description: t('nav.market')
    },
    {
      id: 'remedies' as Screen,
      label: t('nav.remedies'),
      icon: BookOpen,
      description: t('nav.remedies')
    },
    {
      id: 'storage' as Screen,
      label: t('nav.storage'),
      icon: Warehouse,
      description: t('nav.storage')
    },
    {
      id: 'history' as Screen,
      label: t('nav.history'),
      icon: History,
      description: t('nav.history')
    },
    {
      id: 'profile' as Screen,
      label: t('nav.profile'),
      icon: User,
      description: t('nav.profile')
    }
  ];

  return (
    <div className="hidden md:flex w-64 lg:w-72 flex-col min-h-screen sticky top-0 z-20">
      {/* Sidebar Container */}
      <div className="glass-card border-r rounded-r-3xl h-full flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-border/50 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">
                {t('app.name').charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold text-foreground truncate">
                {t('app.name')}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {t('app.tagline')}
              </p>
            </div>
          </div>
          
          {/* Language Switcher */}
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl
                  transition-all duration-300 android-ripple focus-ring
                  group hover:scale-[1.02]
                  ${isActive
                    ? 'bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'hover:bg-muted/50 text-foreground hover:text-primary'
                  }
                `}
                >
                  <div className={`
                  p-2 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-white/20 shadow-md'
                    : 'group-hover:bg-primary/10'
                  }
                `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className={`
                    text-sm font-medium truncate transition-all duration-300
                    ${isActive
                      ? 'text-primary-foreground font-semibold'
                      : 'text-foreground group-hover:text-primary'
                    }
                  `}>
                      {item.label}
                    </div>
                    <div className={`
                    text-xs truncate transition-all duration-300
                    ${isActive
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground group-hover:text-primary/70'
                    }
                  `}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-border/50 flex-shrink-0">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('app.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}