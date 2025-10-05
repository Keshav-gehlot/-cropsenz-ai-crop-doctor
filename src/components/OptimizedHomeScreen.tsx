import { memo, useState, useEffect, useCallback } from 'react';
import { 
  Camera, 
  BarChart3, 
  Warehouse, 
  TrendingUp, 
  Bell, 
  Calendar,
  MapPin,
  Sun,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  ChevronRight,
  Leaf,
  Zap,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { VoiceAssistant } from './VoiceAssistant';
import { Screen } from '../App';

// Lazy load components for better performance
// const WeatherWidget = lazy(() => import('./widgets/WeatherWidget'));
// const QuickActionsWidget = lazy(() => import('./widgets/QuickActionsWidget'));
// const RecentAnalysisWidget = lazy(() => import('./widgets/RecentAnalysisWidget'));

interface OptimizedHomeScreenProps {
  onNavigate?: (path: Screen) => void;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
  uvIndex: number;
  soilMoisture: number;
}

interface CropAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
}

interface RecentAnalysis {
  id: string;
  cropType: string;
  condition: string;
  confidence: number;
  timestamp: Date;
  thumbnail?: string;
}

const OptimizedHomeScreen = memo(function OptimizedHomeScreen({ 
  onNavigate 
}: OptimizedHomeScreenProps) {
  const { t } = useLanguage();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cropAlerts, setCropAlerts] = useState<CropAlert[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data
      setWeatherData({
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        location: 'Current Location',
        uvIndex: 7,
        soilMoisture: 45
      });

      // Mock alerts
      setCropAlerts([
        {
          id: '1',
          type: 'warning',
          title: 'Pest Alert',
          message: 'Aphid activity detected in your tomato field',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          priority: 'high'
        },
        {
          id: '2',
          type: 'info',
          title: 'Weather Update',
          message: 'Light rain expected tomorrow - good for irrigation',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          priority: 'medium'
        }
      ]);

      // Mock recent analyses
      setRecentAnalyses([
        {
          id: '1',
          cropType: 'Tomato',
          condition: 'Healthy',
          confidence: 94,
          timestamp: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          id: '2',
          cropType: 'Wheat',
          condition: 'Nitrogen Deficiency',
          confidence: 87,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    if (onNavigate) {
      switch (action) {
        case 'diagnose':
          onNavigate('diagnosis');
          break;
        case 'grade':
          onNavigate('grading');
          break;
        case 'storage':
          onNavigate('storage');
          break;
        case 'market':
          onNavigate('market');
          break;
        default:
          console.log('Unknown action:', action);
      }
    }
  }, [onNavigate]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    CropSenz
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getGreeting()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatTime(currentTime)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {formatDate(currentTime)}
                </p>
              </div>
              
              {onNavigate && <VoiceAssistant onNavigate={onNavigate} />}
              <LanguageSwitcher variant="primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('quickActions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800 hover:from-green-500/20 hover:to-emerald-500/20"
                onClick={() => handleQuickAction('diagnose')}
              >
                <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">{t('diagnosis')}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800 hover:from-blue-500/20 hover:to-cyan-500/20"
                onClick={() => handleQuickAction('grade')}
              >
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">{t('grading')}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800 hover:from-purple-500/20 hover:to-pink-500/20"
                onClick={() => handleQuickAction('storage')}
              >
                <Warehouse className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium">{t('storage')}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-800 hover:from-orange-500/20 hover:to-red-500/20"
                onClick={() => handleQuickAction('market')}
              >
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium">{t('market')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(weatherData?.condition || '')}
                  {t('weather')}
                </div>
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {weatherData?.location}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {weatherData?.temperature}°C
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {weatherData?.condition}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>{weatherData?.humidity}% Humidity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>{weatherData?.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span>UV {weatherData?.uvIndex}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-green-500" />
                  <span>{weatherData?.soilMoisture}% Soil</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Card */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                {t('alerts')}
                {cropAlerts.length > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {cropAlerts.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cropAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <Shield className={`h-4 w-4 mt-0.5 ${
                      alert.type === 'warning' ? 'text-orange-500' :
                      alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {alert.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {cropAlerts.length === 0 && (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{t('noAlerts')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Analysis */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  {t('recentAnalysis')}
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {analysis.cropType}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {analysis.condition}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={analysis.confidence} className="h-1 flex-1" />
                        <span className="text-xs text-gray-500">{analysis.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {recentAnalyses.length === 0 && (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{t('noRecentAnalysis')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle>{t('quickInsights')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('insightsComingSoon')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle>{t('recommendations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('recommendationsComingSoon')}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
});

export default OptimizedHomeScreen;