import { useState, useEffect, useRef } from 'react';
import './styles/performance.css';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import OptimizedHomeScreen from './components/OptimizedHomeScreen';
import MultilingualStorageScreen from './components/MultilingualStorageScreen';
// Lazy-loaded components for better performance
import { 
  LazyDiagnosisScreen,
  LazyGradingScreen,
  LazyMarketScreen,
  LazyHistoryScreen,
  LazyProfileScreen,
  LazyRemediesScreen
} from './utils/lazyComponents';
import { BottomNavigation } from './components/BottomNavigation';
import { DesktopSidebar } from './components/DesktopSidebar';
import { AndroidEnhanced } from './components/AndroidEnhanced';
import { VoiceAssistant } from './components/VoiceAssistant';
import { PermissionProvider } from './components/PermissionManager';
import { LanguageProvider } from './contexts/LanguageContext';
import { usePreloadScreens } from './hooks/usePreloadScreens';

export type Screen = 'splash' | 'login' | 'home' | 'diagnosis' | 'grading' | 'market' | 'history' | 'profile' | 'remedies' | 'storage';

// Screen configurations for preloading
const screenConfigs = [
  {
    id: 'home',
    path: '/home',
    component: () => import('./components/OptimizedHomeScreen'),
    priority: 'critical' as const,
    preloadConditions: { userIdle: false },
    estimatedSize: 100
  },
  {
    id: 'diagnosis',
    path: '/diagnosis',
    component: () => import('./components/DiagnosisScreen'),
    priority: 'high' as const,
    preloadConditions: { userIdle: true },
    estimatedSize: 150
  },
  {
    id: 'storage',
    path: '/storage',
    component: () => import('./components/MultilingualStorageScreen'),
    priority: 'high' as const,
    preloadConditions: { userIdle: true },
    estimatedSize: 120
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const screenRef = useRef<HTMLDivElement>(null);

  // Initialize preloading system
  usePreloadScreens(screenConfigs, {
    maxConcurrentLoads: 2,
    respectDataSaver: true
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.colorScheme = 'light';
    }

    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDarkMode ? '#1a1a1a' : '#2d5a2d');
    }
  }, [isDarkMode]);

  useEffect(() => {
    console.log('Current screen:', currentScreen);
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        console.log('Transitioning from splash to login');
        setCurrentScreen('login');
      }, 2000);
      return () => clearTimeout(timer);
    }
    // Return undefined for non-splash screens (no cleanup needed)
    return undefined;
  }, [currentScreen]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateToScreen('home');
  };

  const navigateToScreen = async (screen: Screen | string) => {
    setIsLoading(true);
    
    try {
      const targetScreen = screen as Screen;
      
      // Preload the target screen if available
      if (['home', 'diagnosis', 'storage'].includes(targetScreen)) {
        // preloadSystem.preloadScreen(targetScreen);
      }
      
      setCurrentScreen(targetScreen);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const renderScreen = () => {
    console.log('Rendering screen:', currentScreen);

    // Show loading screen during transitions
    if (isLoading) {
      return <LoadingScreen message={`Loading ${currentScreen}...`} />;
    }

    switch (currentScreen) {
      case 'splash':
        console.log('Rendering SplashScreen');
        return <SplashScreen />;
      case 'login':
        console.log('Rendering LoginScreen');
        return <LoginScreen onLogin={handleLogin} onNavigate={navigateToScreen} />;
      case 'home':
        console.log('Rendering OptimizedHomeScreen');
        return <OptimizedHomeScreen onNavigate={navigateToScreen} />;
      case 'diagnosis':
        return <LazyDiagnosisScreen onNavigate={navigateToScreen} />;
      case 'grading':
        return <LazyGradingScreen onNavigate={navigateToScreen} />;
      case 'market':
        return <LazyMarketScreen onNavigate={navigateToScreen} />;
      case 'history':
        return <LazyHistoryScreen onNavigate={navigateToScreen} />;
      case 'profile':
        return <LazyProfileScreen onNavigate={navigateToScreen} isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />;
      case 'remedies':
        return <LazyRemediesScreen onNavigate={navigateToScreen} />;
      case 'storage':
        return <MultilingualStorageScreen />;
      default:
        return <OptimizedHomeScreen onNavigate={navigateToScreen} />;
    }
  };

  if (['splash', 'login'].includes(currentScreen)) {
    return (
      <ErrorBoundary>
        <LanguageProvider>
          <PermissionProvider>
            <AndroidEnhanced>
              <div className="w-full min-h-screen bg-background">
                <div ref={screenRef} className="fade-in">
                  {renderScreen()}
                </div>
              </div>
            </AndroidEnhanced>
          </PermissionProvider>
        </LanguageProvider>
      </ErrorBoundary>
    );
  }

  const showBottomNav = isAuthenticated && !['splash', 'login'].includes(currentScreen) && isMobile;
  const showSidebar = isAuthenticated && !['splash', 'login'].includes(currentScreen) && !isMobile;

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <PermissionProvider>
        <AndroidEnhanced>
          <div className="w-full min-h-screen flex relative overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            {showSidebar && (
              <div className="slide-in-right">
                <DesktopSidebar currentScreen={currentScreen} onNavigate={navigateToScreen} />
              </div>
            )}

            {/* Main Content Area */}
            <div className={`
              flex-1 min-h-screen relative
              ${showSidebar ? 'ml-0' : ''}
              ${showBottomNav ? 'pb-20' : 'pb-0'}
            `}>
              <div ref={screenRef} className={`
                min-h-screen w-full relative fade-in
                ${isMobile
                  ? 'px-0 py-0'
                  : showSidebar
                    ? 'px-6 py-6 lg:px-8 lg:py-8'
                    : 'max-w-7xl mx-auto px-8 py-8'
                }
              `}>
                {renderScreen()}
              </div>
            </div>

            {/* Mobile Bottom Navigation */}
            {showBottomNav && (
              <div className="slide-in-bottom">
                <BottomNavigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
              </div>
            )}

            {/* Voice Assistant */}
            {isAuthenticated && !['splash', 'login'].includes(currentScreen) && (
              <VoiceAssistant onNavigate={navigateToScreen} />
            )}
          </div>
        </AndroidEnhanced>
        </PermissionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
