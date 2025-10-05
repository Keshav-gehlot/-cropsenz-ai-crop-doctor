import React from 'react';
import { AlertCircle, Mic, Settings, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface PermissionHelperProps {
  onClose: () => void;
}

export function PermissionHelper({ onClose }: PermissionHelperProps) {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isChrome = /Chrome/i.test(navigator.userAgent);

  const handleOpenSettings = () => {
    if (isAndroid && isChrome) {
      alert('To enable microphone:\n1. Tap the lock icon next to the URL\n2. Select "Permissions"\n3. Set Microphone to "Allow"');
    } else {
      alert('To enable microphone:\n1. Look for the microphone icon in your browser\n2. Click "Allow" or check browser settings\n3. Refresh the page');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Microphone Permission Needed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Voice commands need microphone access to help you navigate the app hands-free while working in the field.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              How to enable:
            </h4>

            {isAndroid && isChrome ? (
              <div className="text-sm space-y-2 bg-muted p-3 rounded-lg">
                <p><strong>For Android Chrome:</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Tap the lock icon (🔒) next to the website address</li>
                  <li>Select "Permissions" or "Site settings"</li>
                  <li>Find "Microphone" and set it to "Allow"</li>
                  <li>Refresh this page</li>
                </ol>
              </div>
            ) : (
              <div className="text-sm space-y-2 bg-muted p-3 rounded-lg">
                <p><strong>General steps:</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Look for microphone icon in browser address bar</li>
                  <li>Click "Allow" when prompted for microphone access</li>
                  <li>Or check your browser's site permissions</li>
                  <li>Refresh the page if needed</li>
                </ol>
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
            <p><strong>Privacy Note:</strong> Your voice is processed locally on your device. We don't store or send your voice data to any servers.</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 android-ripple"
              onClick={handleOpenSettings}
            >
              <Settings className="w-4 h-4 mr-2" />
              Help with Settings
            </Button>
            <Button
              className="flex-1 android-ripple"
              onClick={onClose}
            >
              Got it
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            You can still use all app features with touch navigation if voice isn't available.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
