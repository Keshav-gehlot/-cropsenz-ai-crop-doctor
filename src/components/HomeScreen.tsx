import { useEffect, useRef } from 'react';
import { Bell, Settings, Camera, Search, Award, TrendingUp, BookOpen, User } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import LanguageSwitcher from './LanguageSwitcher';
import { Screen } from '../App';
import { useResponsive, useResponsiveSpacing } from './hooks/useResponsive';
import { ResponsiveLayout, ResponsiveGrid, ResponsiveCard } from './ResponsiveLayout';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { isMobile } = useResponsive();
  const spacing = useResponsiveSpacing();

  const headerRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

  }, []);

  const quickActions = [
    {
      icon: Camera,
      title: 'Take Crop Photo',
      subtitle: 'Upload image',
      action: () => onNavigate('diagnosis'),
      color: 'bg-blue-500'
    },
    {
      icon: Search,
      title: 'Diagnose Health',
      subtitle: 'AI diagnosis',
      action: () => onNavigate('diagnosis'),
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'Grade Quality',
      subtitle: 'Check grade',
      action: () => onNavigate('grading'),
      color: 'bg-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      subtitle: 'Live prices',
      action: () => onNavigate('market'),
      color: 'bg-purple-500'
    },
    {
      icon: BookOpen,
      title: 'Remedies',
      subtitle: 'Expert tips',
      action: () => onNavigate('remedies'),
      color: 'bg-teal-500'
    }
  ];

  return (
    <ResponsiveLayout className="min-h-screen bg-background" maxWidth="full" padding="none">
      {}
      <div
        ref={headerRef}
        className={`bg-primary text-white ${isMobile ? 'p-4 rounded-b-3xl' : 'p-6 lg:p-8 rounded-b-2xl'}`}
      >
        <div className={`container-responsive max-w-7xl mx-auto`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className={isMobile ? 'w-10 h-10' : 'w-12 h-12'}>
                <AvatarFallback className="bg-white/20 text-white">
                  <User className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className={isMobile ? 'text-lg' : 'text-xl lg:text-2xl'}>Good morning</h2>
                <p className="text-white/80">Farmer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher variant="primary" />
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </Button>
            </div>
          </div>

          {}
          <ResponsiveCard className="bg-white/10 border-white/20">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm text-white/80">Today's Weather</p>
                <p className={isMobile ? 'text-lg' : 'text-xl'}>28°C • Sunny</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Humidity</p>
                <p className={isMobile ? 'text-base' : 'text-lg'}>65%</p>
              </div>
            </div>
          </ResponsiveCard>
        </div>
      </div>

      <div className={`container-responsive max-w-7xl mx-auto ${isMobile ? 'px-4 py-4' : spacing.padding}`}>
        {}
        <ResponsiveCard className="bg-gradient-to-r from-accent/20 to-primary/10 border-primary/20 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-primary rounded-full flex items-center justify-center`}>
              <BookOpen className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
            </div>
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>AI Recommendation</h3>
          </div>
          <p className={`text-foreground mb-3 ${isMobile ? 'text-base' : 'text-lg'}`}>
            Based on current market trends and weather, consider holding your wheat crop for 1 week. Expected price increase: ₹50/quintal.
          </p>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Confidence: 85%
          </Badge>
        </ResponsiveCard>

        {}
        <div ref={quickActionsRef} className="mb-8">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-4`}>Quick Actions</h3>
          <ResponsiveGrid
            cols={{
              mobile: 2,
              tablet: 3,
              desktop: 4
            }}
            gap={isMobile ? 'sm' : 'md'}
          >
            {quickActions.map((action, index) => (
              <div
                key={index}
                data-action-card
                className="cursor-pointer"
                onClick={() => action.action()}
              >
                <ResponsiveCard
                  className="hover:shadow-md android-ripple touch-target text-center group"
                >
                  <div className={`${action.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 ${
                    isMobile ? 'w-14 h-14' : 'w-16 h-16 lg:w-20 lg:h-20'
                  }`}>
                    <action.icon className={`text-white ${
                      isMobile ? 'w-7 h-7' : 'w-8 h-8 lg:w-10 lg:h-10'
                    }`} />
                  </div>
                  <h4 className={`font-medium mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                    {action.title}
                  </h4>
                  <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {action.subtitle}
                  </p>
                </ResponsiveCard>
              </div>
            ))}
          </ResponsiveGrid>
        </div>

        {}
        <div>
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-4`}>Recent Activity</h3>
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-green-100 rounded-full flex items-center justify-center`}>
                  <Search className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-green-600`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
                    Wheat Disease Diagnosis
                  </p>
                  <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
                    2 hours ago • Healthy crop detected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-orange-100 rounded-full flex items-center justify-center`}>
                  <Award className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-orange-600`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
                    Rice Quality Grading
                  </p>
                  <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
                    Yesterday • Grade A quality
                  </p>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        </div>

        {}
        {}
      </div>
    </ResponsiveLayout>
  );
}
