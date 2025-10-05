import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { usePermissions } from './PermissionManager';
import { CheckCircle, XCircle, AlertCircle, Globe, Shield } from 'lucide-react';

export function PermissionDebug() {
  const { permissions, isHTTPS, checkSupport, requestMicrophone, requestCamera } = usePermissions();
  const support = checkSupport();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'requesting':
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'requesting':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">Permission Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm">HTTPS Connection</span>
          </div>
          <Badge className={isHTTPS ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {isHTTPS ? 'Secure' : 'Insecure'}
          </Badge>
        </div>

        {}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Microphone Support</span>
          </div>
          <Badge className={support.microphone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {support.microphone ? 'Supported' : 'Not Supported'}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Camera Support</span>
          </div>
          <Badge className={support.camera ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {support.camera ? 'Supported' : 'Not Supported'}
          </Badge>
        </div>

        {}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(permissions.microphone)}
            <span className="text-sm">Microphone Permission</span>
          </div>
          <Badge className={getStatusColor(permissions.microphone)}>
            {permissions.microphone}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(permissions.camera)}
            <span className="text-sm">Camera Permission</span>
          </div>
          <Badge className={getStatusColor(permissions.camera)}>
            {permissions.camera}
          </Badge>
        </div>

        {}
        <div className="text-xs text-muted-foreground border-t pt-2">
          <p>Browser: {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other'}</p>
          <p>Platform: {navigator.platform}</p>
          <p>Protocol: {window.location.protocol}</p>
        </div>

        {}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={requestMicrophone}
            disabled={permissions.microphone === 'requesting'}
          >
            Test Mic
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={requestCamera}
            disabled={permissions.camera === 'requesting'}
          >
            Test Camera
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
