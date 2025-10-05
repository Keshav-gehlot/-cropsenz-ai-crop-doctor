import { createContext, useContext, useState, useEffect } from 'react';

export type PermissionStatus = 'unknown' | 'granted' | 'denied' | 'requesting' | 'unavailable';

interface PermissionState {
  microphone: PermissionStatus;
  camera: PermissionStatus;
}

interface PermissionContextType {
  permissions: PermissionState;
  requestMicrophone: () => Promise<boolean>;
  requestCamera: () => Promise<boolean>;
  isHTTPS: boolean;
  checkSupport: () => { microphone: boolean; camera: boolean };
}

const PermissionContext = createContext<PermissionContextType | null>(null);

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within PermissionProvider');
  }
  return context;
}

interface PermissionProviderProps {
  children: React.ReactNode;
}

export function PermissionProvider({ children }: PermissionProviderProps) {
  const [permissions, setPermissions] = useState<PermissionState>({
    microphone: 'unknown',
    camera: 'unknown'
  });

  const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

  const checkSupport = () => {
    const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasSpeechRecognition = !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    return {
      microphone: hasMediaDevices && hasSpeechRecognition,
      camera: hasMediaDevices
    };
  };

  const updatePermissionStatus = async (type: 'microphone' | 'camera') => {
    try {
      if (!navigator.permissions) {
        return;
      }

      const result = await navigator.permissions.query({
        name: type as PermissionName
      });

      setPermissions(prev => ({
        ...prev,
        [type]: result.state as PermissionStatus
      }));

      result.addEventListener('change', () => {
        setPermissions(prev => ({
          ...prev,
          [type]: result.state as PermissionStatus
        }));
      });
    } catch (error) {
      console.log(`Permission query for ${type} not supported`);
    }
  };

  const requestMicrophone = async (): Promise<boolean> => {
    const support = checkSupport();

    if (!support.microphone) {
      setPermissions(prev => ({ ...prev, microphone: 'unavailable' }));
      return false;
    }

    if (!isHTTPS) {
      console.warn('Microphone requires HTTPS connection');
      setPermissions(prev => ({ ...prev, microphone: 'denied' }));
      return false;
    }

    if (permissions.microphone === 'granted') {
      return true;
    }

    try {
      setPermissions(prev => ({ ...prev, microphone: 'requesting' }));

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      stream.getTracks().forEach(track => {
        track.stop();
      });

      setPermissions(prev => ({ ...prev, microphone: 'granted' }));
      console.log('Microphone permission granted successfully');
      return true;
    } catch (error: any) {
      console.error('Microphone permission error:', error);

      switch (error.name) {
        case 'NotAllowedError':
          console.log('User denied microphone permission');
          setPermissions(prev => ({ ...prev, microphone: 'denied' }));
          break;
        case 'NotFoundError':
          console.log('No microphone device found');
          setPermissions(prev => ({ ...prev, microphone: 'unavailable' }));
          break;
        case 'NotReadableError':
          console.log('Microphone is being used by another application');
          setPermissions(prev => ({ ...prev, microphone: 'denied' }));
          break;
        case 'OverconstrainedError':
          console.log('Microphone constraints not supported');
          setPermissions(prev => ({ ...prev, microphone: 'unavailable' }));
          break;
        case 'SecurityError':
          console.log('Security error accessing microphone');
          setPermissions(prev => ({ ...prev, microphone: 'denied' }));
          break;
        default:
          console.log('Unknown microphone error:', error.message);
          setPermissions(prev => ({ ...prev, microphone: 'denied' }));
      }

      return false;
    }
  };

  const requestCamera = async (): Promise<boolean> => {
    const support = checkSupport();

    if (!support.camera) {
      setPermissions(prev => ({ ...prev, camera: 'unavailable' }));
      return false;
    }

    if (!isHTTPS) {
      setPermissions(prev => ({ ...prev, camera: 'denied' }));
      return false;
    }

    try {
      setPermissions(prev => ({ ...prev, camera: 'requesting' }));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      stream.getTracks().forEach(track => track.stop());

      setPermissions(prev => ({ ...prev, camera: 'granted' }));
      return true;
    } catch (error: any) {
      console.error('Camera permission error:', error);

      if (error.name === 'NotAllowedError') {
        setPermissions(prev => ({ ...prev, camera: 'denied' }));
      } else if (error.name === 'NotFoundError') {
        setPermissions(prev => ({ ...prev, camera: 'unavailable' }));
      } else {
        setPermissions(prev => ({ ...prev, camera: 'denied' }));
      }

      return false;
    }
  };

  useEffect(() => {
    updatePermissionStatus('microphone');
    updatePermissionStatus('camera');
  }, []);

  return (
    <PermissionContext.Provider value={{
      permissions,
      requestMicrophone,
      requestCamera,
      isHTTPS,
      checkSupport
    }}>
      {children}
    </PermissionContext.Provider>
  );
}
