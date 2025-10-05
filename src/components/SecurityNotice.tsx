import React from 'react';
import { Shield, AlertTriangle, Smartphone, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface SecurityNoticeProps {
  type: 'camera' | 'microphone' | 'both';
  onClose: () => void;
  isHTTPS: boolean;
}

export function SecurityNotice({ type, onClose, isHTTPS }: SecurityNoticeProps) {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isChrome = /Chrome/i.test(navigator.userAgent);
  const isFirefox = /Firefox/i.test(navigator.userAgent);

  const getPermissionSteps = () => {
    if (isAndroid && isChrome) {
      return {
        title: 'For Android Chrome:',
        steps: [
          'Tap the lock icon (🔒) or info icon (ⓘ) next to the address bar',
          `Find "${type === 'both' ? 'Camera and Microphone' : type === 'camera' ? 'Camera' : 'Microphone'}" in permissions`,
          'Change setting from "Ask" or "Block" to "Allow"',
          'Refresh the page by pulling down or tapping reload',
          'Try the feature again'
        ]
      };
    } else if (isFirefox) {
      return {
        title: 'For Firefox:',
        steps: [
          'Click the shield icon or camera/microphone icon in the address bar',
          'Select "Allow" for the permissions needed',
          'If blocked, go to site settings and change permissions',
          'Refresh the page',
          'Try again'
        ]
      };
    } else {
      return {
        title: 'General steps:',
        steps: [
          'Look for camera/microphone icons in your browser address bar',
          'Click "Allow" when prompted for permissions',
          'If permissions are blocked, click the lock icon in address bar',
          'Change permissions to "Allow"',
          'Refresh the page and try again'
        ]
      };
    }
  };

  const permissionSteps = getPermissionSteps();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {type === 'camera' ? (
              <Smartphone className="w-5 h-5" />
            ) : type === 'microphone' ? (
              <Shield className="w-5 h-5" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
            {type === 'both' ? 'Camera & Microphone Access' :
             type === 'camera' ? 'Camera Access Required' : 'Microphone Access Required'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {!isHTTPS && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Issue:</strong> Camera and microphone access requires a secure connection (HTTPS).
                This app may not work properly on HTTP connections.
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-blue-900">Why do we need access?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {type === 'camera' && (
                    <>
                      <li>• Take photos of your crops for AI health diagnosis</li>
                      <li>• Capture harvest images for quality grading</li>
                      <li>• Easy hands-free operation while farming</li>
                    </>
                  )}
                  {type === 'microphone' && (
                    <>
                      <li>• Voice commands for hands-free navigation</li>
                      <li>• Quick access while working in the field</li>
                      <li>• Navigate without touching your device</li>
                    </>
                  )}
                  {type === 'both' && (
                    <>
                      <li>• Take photos and use voice commands</li>
                      <li>• Complete hands-free farming assistance</li>
                      <li>• Work efficiently without touching device</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              How to enable permissions:
            </h4>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium text-sm mb-2">{permissionSteps.title}</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {permissionSteps.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy:</strong> All processing happens on your device. We never store or send your photos or voice data to our servers.
            </AlertDescription>
          </Alert>

          {!isHTTPS && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Connection Issue:</strong> You're using an insecure connection (HTTP). {type === 'both' ? 'Camera and microphone' : type} access requires HTTPS for security.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Badge variant="outline" className="w-full justify-center py-2">
              Your data stays private and secure
            </Badge>

            <div className="text-xs text-center text-muted-foreground space-y-1">
              <p>Still having trouble? Try:</p>
              <p>• Clearing browser cache • Restarting browser • Using latest Chrome/Firefox</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1 android-ripple"
              onClick={onClose}
            >
              Got it, I'll try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
