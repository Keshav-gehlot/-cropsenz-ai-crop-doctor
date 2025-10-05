import { useRef, useState, useEffect } from 'react';
import { Camera, RotateCcw, Check, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { usePermissions } from './PermissionManager';
import { SecurityNotice } from './SecurityNotice';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const { permissions, requestCamera, isHTTPS, checkSupport } = usePermissions();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [error, setError] = useState<string>('');
  const [showSecurityNotice, setShowSecurityNotice] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const support = checkSupport();
  const permissionStatus = permissions.camera;

  useEffect(() => {
    initializeCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (permissionStatus === 'granted' && !error) {
      startCamera();
    }
  }, [facingMode, permissionStatus]);

  const initializeCamera = async () => {
    setIsInitializing(true);
    setError('');

    if (!support.camera) {
      setError('Camera is not supported on this device.');
      setIsInitializing(false);
      return;
    }

    if (!isHTTPS) {
      setShowSecurityNotice(true);
      setIsInitializing(false);
      return;
    }

    if (permissionStatus !== 'granted') {
      const hasPermission = await requestCamera();
      if (!hasPermission) {
        if (permissionStatus === 'denied') {
          setShowSecurityNotice(true);
        } else {
          setError('Unable to access camera. Please check your device settings.');
        }
        setIsInitializing(false);
        return;
      }
    }

    setIsInitializing(false);
    startCamera();
  };

  const startCamera = async () => {
    if (stream) {
      stopCamera();
    }

    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error: any) {
      console.error('Error accessing camera:', error);

      if (error.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera access in your browser settings.');
        setShowSecurityNotice(true);
      } else if (error.name === 'NotFoundError') {
        setError('No camera found. Please check your device.');
      } else if (error.name === 'NotReadableError') {
        setError('Camera is already in use by another application.');
      } else {
        setError('Unable to access camera. Please try again.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
      onClose();
    }
  };

  const switchCamera = () => {
    if (!error && permissionStatus === 'granted') {
      setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    }
  };

  const handleRetryCamera = async () => {
    setError('');
    await initializeCamera();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {error || isInitializing ? (
          <div className="w-full h-full bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
              <CardContent className="p-6 text-center space-y-4">
                {isInitializing ? (
                  <>
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h3 className="font-medium">Initializing Camera...</h3>
                    <p className="text-sm text-muted-foreground">
                      Setting up camera access for crop photos
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
                    <h3 className="font-medium text-destructive">Camera Error</h3>
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <Button
                        className="w-full android-ripple"
                        onClick={handleRetryCamera}
                      >
                        Try Again
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full android-ripple"
                        onClick={() => setShowSecurityNotice(true)}
                      >
                        Help with Permissions
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full android-ripple"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        ) : !capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            {}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-8">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white/20 border-white/30 text-white android-ripple"
                onClick={switchCamera}
              >
                <RotateCcw className="w-6 h-6" />
              </Button>

              <Button
                size="icon"
                className="w-20 h-20 rounded-full bg-white text-black hover:bg-white/90 android-ripple"
                onClick={capturePhoto}
              >
                <Camera className="w-8 h-8" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white/20 border-white/30 text-white android-ripple"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <img
              src={capturedImage}
              alt="Captured crop"
              className="w-full h-full object-cover"
            />

            {}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-8">
              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full bg-white/20 border-white/30 text-white android-ripple"
                onClick={retakePhoto}
              >
                <X className="w-6 h-6" />
              </Button>

              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-primary text-white hover:bg-primary/90 android-ripple"
                onClick={confirmPhoto}
              >
                <Check className="w-6 h-6" />
              </Button>
            </div>
          </>
        )}
      </div>

      {}
      {!error && !isInitializing && (
        <div className="bg-black/50 text-white p-4 text-center">
          <p className="text-sm">
            {!capturedImage
              ? 'Position your crop in the center and tap the camera button'
              : 'Review your photo and confirm or retake'
            }
          </p>
        </div>
      )}

      {}
      {showSecurityNotice && (
        <SecurityNotice
          type="camera"
          onClose={() => setShowSecurityNotice(false)}
          isHTTPS={isHTTPS}
        />
      )}
    </div>
  );
}
