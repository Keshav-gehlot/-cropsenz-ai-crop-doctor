import { useEffect, useState } from 'react';
import { Loader2, Leaf, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  progress?: number;
  showProgress?: boolean;
}

export default function LoadingScreen({ 
  message = "Loading CropSenz...", 
  progress = 0,
  showProgress = false 
}: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState(message);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (showProgress) {
      setAnimatedProgress(progress);
    }
  }, [progress, showProgress]);

  useEffect(() => {
    const loadingMessages = [
      "Loading CropSenz...",
      "Preparing your agricultural assistant...",
      "Setting up crop intelligence...",
      "Almost ready..."
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      const nextMessage = loadingMessages[messageIndex];
      if (nextMessage) {
        setLoadingText(nextMessage);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-800 flex flex-col items-center justify-center z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-200/20 dark:bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo and brand */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-green-100 dark:border-green-800">
              <Leaf className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              CropSenz
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your AI-Powered Agricultural Assistant
            </p>
          </div>
        </div>

        {/* Loading animation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 text-green-600 dark:text-green-400 animate-spin" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
          
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 text-center animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Progress bar (if enabled) */}
        {showProgress && (
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(animatedProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                data-progress={animatedProgress}
              />
            </div>
          </div>
        )}

        {/* Features preview */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm opacity-60">
          <div className="text-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">AI Analysis</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-200"></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Diagnosis</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-400"></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Solutions</p>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Powered by Advanced AI Technology
        </p>
      </div>
    </div>
  );
}

// Hook for managing loading states
export function useLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [progress, setProgress] = useState(0);

  const showLoading = (message?: string) => {
    setIsLoading(true);
    if (message) setLoadingMessage(message);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const updateProgress = (value: number) => {
    setProgress(Math.max(0, Math.min(100, value)));
  };

  return {
    isLoading,
    loadingMessage,
    progress,
    showLoading,
    hideLoading,
    updateProgress,
    setLoadingMessage
  };
}