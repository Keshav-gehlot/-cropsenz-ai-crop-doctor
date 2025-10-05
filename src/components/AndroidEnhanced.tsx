import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Download, X, WifiOff } from 'lucide-react';

interface AndroidEnhancedProps {
  children: React.ReactNode;
}

export function AndroidEnhanced({ children }: AndroidEnhancedProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handlePopState = (e: PopStateEvent) => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        e.preventDefault();
        if (window.location.pathname === '/') {
          if ('navigator' in window && 'app' in (window as any).navigator) {
            (window as any).navigator.app.exitApp();
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }

    setDeferredPrompt(null);
  };

  return (
    <>
      {}
      {window.matchMedia('(display-mode: standalone)').matches && (
        <div className="status-bar-overlay" />
      )}

      {}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 text-center text-sm z-50 flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          You're offline. Some features may not work.
        </div>
      )}

      {}
      {showInstallPrompt && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-sm mx-auto">
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Install CropSenz</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowInstallPrompt(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Install our app for faster access, offline features, and better camera/microphone support
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 android-ripple"
                  onClick={handleInstallClick}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install App
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInstallPrompt(false)}
                >
                  Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {}
      <div className={`${!isOnline ? 'pt-12' : ''}`}>
        {children}
      </div>
    </>
  );
}
