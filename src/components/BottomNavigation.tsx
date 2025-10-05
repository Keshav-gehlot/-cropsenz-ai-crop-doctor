import { Home, Search, TrendingUp, History, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const { t } = useLanguage();
  
  const navItems = [
    { screen: 'home' as Screen, icon: Home, label: t('nav.home') },
    { screen: 'diagnosis' as Screen, icon: Search, label: t('nav.diagnose') },
    { screen: 'market' as Screen, icon: TrendingUp, label: t('nav.prices') },
    { screen: 'history' as Screen, icon: History, label: t('nav.history') },
    { screen: 'profile' as Screen, icon: User, label: t('nav.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden">
      {}
      <div className="glass-card border-t-0 rounded-t-3xl">
        <div className="safe-area-bottom">
          {}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-muted/30 rounded-full"></div>
          </div>

          <div className="flex items-center justify-evenly px-6 pb-2">
            {navItems.map(({ screen, icon: Icon, label }) => {
              const isActive = currentScreen === screen;
              return (
                <button
                  key={screen}
                  onClick={() => onNavigate(screen)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl
                    transition-all duration-300 android-ripple touch-target
                    flex-1 max-w-[72px] group focus-ring
                    ${isActive
                      ? 'text-primary scale-110 bg-primary/15 shadow-lg'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/30 hover:scale-105'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-xl transition-all duration-300
                    ${isActive
                      ? 'bg-primary/20 shadow-md'
                      : 'group-hover:bg-primary/10'
                    }
                  `}>
                    <Icon className={`
                      w-5 h-5 transition-all duration-300
                      ${isActive ? 'text-primary scale-110' : 'group-hover:scale-110'}
                    `} />
                  </div>
                  <span className={`
                    text-xs font-medium leading-tight mt-1 transition-all duration-300
                    ${isActive ? 'text-primary font-semibold' : 'group-hover:text-primary'}
                  `}>
                    {label}
                  </span>

                  {}
                  {isActive && (
                    <div className="w-1 h-1 bg-primary rounded-full mt-1 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
