import { useState, useEffect, useCallback, useRef } from 'react';

interface ScreenConfig {
  id: string;
  path: string;
  component: () => Promise<any>;
  priority: 'critical' | 'high' | 'medium' | 'low';
  preloadConditions?: {
    userIdle?: boolean;
    networkSpeed?: 'fast' | 'slow' | 'any';
    batteryLevel?: number;
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night' | 'any';
  };
  dependencies?: string[];
  estimatedSize?: number; // KB
}

interface PreloadOptions {
  maxConcurrentLoads?: number;
  respectDataSaver?: boolean;
  networkThreshold?: 'fast' | 'slow';
  batteryThreshold?: number;
  idleTimeout?: number;
}

interface PreloadState {
  loaded: Set<string>;
  loading: Set<string>;
  failed: Set<string>;
  progress: Record<string, number>;
  totalSize: number;
  loadedSize: number;
}

export function usePreloadScreens(
  screens: ScreenConfig[],
  options: PreloadOptions = {}
) {
  const {
    maxConcurrentLoads = 2,
    respectDataSaver = true,
    networkThreshold = 'slow',
    batteryThreshold = 20,
    idleTimeout = 2000
  } = options;

  const [state, setState] = useState<PreloadState>({
    loaded: new Set(),
    loading: new Set(),
    failed: new Set(),
    progress: {},
    totalSize: 0,
    loadedSize: 0
  });

  const [isUserIdle, setIsUserIdle] = useState(false);
  const [networkInfo, setNetworkInfo] = useState({
    effectiveType: '4g',
    saveData: false,
    downlink: 10
  });
  const [batteryLevel, setBatteryLevel] = useState(100);

  const idleTimerRef = useRef<NodeJS.Timeout>();
  const loadQueueRef = useRef<string[]>([]);
  const componentsRef = useRef<Record<string, any>>({});

  // Monitor user idle state
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsUserIdle(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsUserIdle(true);
      }, idleTimeout);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [idleTimeout]);

  // Monitor network conditions
  useEffect(() => {
    const updateNetworkInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setNetworkInfo({
          effectiveType: connection?.effectiveType || '4g',
          saveData: connection?.saveData || false,
          downlink: connection?.downlink || 10
        });
      }
    };

    updateNetworkInfo();
    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      if ('connection' in navigator) {
        (navigator as any).connection?.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  // Monitor battery level
  useEffect(() => {
    const updateBatteryLevel = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          
          const updateLevel = () => {
            setBatteryLevel(Math.round(battery.level * 100));
          };
          
          battery.addEventListener('levelchange', updateLevel);
          return () => battery.removeEventListener('levelchange', updateLevel);
        } catch (error) {
          // Battery API not supported
          console.warn('Battery API not supported');
        }
      }
      return undefined;
    };

    updateBatteryLevel();
  }, []);

  // Check if conditions are met for preloading
  const shouldPreload = useCallback((screen: ScreenConfig): boolean => {
    const conditions = screen.preloadConditions || {};

    // Check data saver mode
    if (respectDataSaver && networkInfo.saveData) {
      return false;
    }

    // Check network speed
    if (conditions.networkSpeed && conditions.networkSpeed !== 'any') {
      const isFastNetwork = networkInfo.effectiveType === '4g' && networkInfo.downlink > 5;
      if (conditions.networkSpeed === 'fast' && !isFastNetwork) {
        return false;
      }
      if (networkThreshold === 'fast' && !isFastNetwork) {
        return false;
      }
    }

    // Check battery level
    if (conditions.batteryLevel && batteryLevel < conditions.batteryLevel) {
      return false;
    }
    if (batteryLevel < batteryThreshold) {
      return false;
    }

    // Check user idle state
    if (conditions.userIdle && !isUserIdle) {
      return false;
    }

    // Check time of day
    if (conditions.timeOfDay && conditions.timeOfDay !== 'any') {
      const hour = new Date().getHours();
      const timeOfDay = 
        hour < 6 ? 'night' :
        hour < 12 ? 'morning' :
        hour < 18 ? 'afternoon' : 'evening';
      
      if (conditions.timeOfDay !== timeOfDay) {
        return false;
      }
    }

    return true;
  }, [networkInfo, batteryLevel, isUserIdle, respectDataSaver, networkThreshold, batteryThreshold]);

  // Load a screen component
  const loadScreen = useCallback(async (screenId: string): Promise<void> => {
    const screen = screens.find(s => s.id === screenId);
    if (!screen || state.loaded.has(screenId) || state.loading.has(screenId)) {
      return;
    }

    if (!shouldPreload(screen)) {
      console.log(`Skipping preload of ${screenId} - conditions not met`);
      return;
    }

    setState(prev => ({
      ...prev,
      loading: new Set([...prev.loading, screenId]),
      progress: { ...prev.progress, [screenId]: 0 }
    }));

    try {
      console.log(`Preloading screen: ${screenId}`);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: {
            ...prev.progress,
            [screenId]: Math.min(90, (prev.progress[screenId] || 0) + 10)
          }
        }));
      }, 100);

      const component = await screen.component();
      componentsRef.current[screenId] = component;

      clearInterval(progressInterval);

      setState(prev => ({
        ...prev,
        loaded: new Set([...prev.loaded, screenId]),
        loading: new Set([...prev.loading].filter(id => id !== screenId)),
        progress: { ...prev.progress, [screenId]: 100 },
        loadedSize: prev.loadedSize + (screen.estimatedSize || 50)
      }));

      console.log(`Successfully preloaded: ${screenId}`);
    } catch (error) {
      console.warn(`Failed to preload ${screenId}:`, error);
      
      setState(prev => ({
        ...prev,
        loading: new Set([...prev.loading].filter(id => id !== screenId)),
        failed: new Set([...prev.failed, screenId]),
        progress: { ...prev.progress, [screenId]: 0 }
      }));
    }
  }, [screens, state.loaded, state.loading, shouldPreload]);

  // Process load queue
  const processLoadQueue = useCallback(async () => {
    if (state.loading.size >= maxConcurrentLoads) {
      return;
    }

    const availableSlots = maxConcurrentLoads - state.loading.size;
    const itemsToLoad = loadQueueRef.current.splice(0, availableSlots);

    await Promise.all(itemsToLoad.map(loadScreen));
  }, [state.loading.size, maxConcurrentLoads, loadScreen]);

  // Add to load queue
  const queueForLoading = useCallback((screenId: string) => {
    if (!loadQueueRef.current.includes(screenId) && 
        !state.loaded.has(screenId) && 
        !state.loading.has(screenId)) {
      loadQueueRef.current.push(screenId);
      processLoadQueue();
    }
  }, [state.loaded, state.loading, processLoadQueue]);

  // Auto-preload based on priority
  useEffect(() => {
    const criticalScreens = screens
      .filter(s => s.priority === 'critical' && shouldPreload(s))
      .map(s => s.id);

    criticalScreens.forEach(queueForLoading);
  }, [screens, shouldPreload, queueForLoading]);

  // Preload high priority screens when user is idle
  useEffect(() => {
    if (isUserIdle) {
      const highPriorityScreens = screens
        .filter(s => s.priority === 'high' && shouldPreload(s))
        .map(s => s.id);

      highPriorityScreens.forEach(queueForLoading);
    }
  }, [isUserIdle, screens, shouldPreload, queueForLoading]);

  // Get preloaded component
  const getComponent = useCallback((screenId: string) => {
    return componentsRef.current[screenId];
  }, []);

  // Force preload a screen
  const preloadScreen = useCallback((screenId: string) => {
    queueForLoading(screenId);
  }, [queueForLoading]);

  // Get preload statistics
  const getStats = useCallback(() => {
    const totalScreens = screens.length;
    const loadedCount = state.loaded.size;
    const loadingCount = state.loading.size;
    const failedCount = state.failed.size;
    
    return {
      totalScreens,
      loadedCount,
      loadingCount,
      failedCount,
      loadedPercentage: Math.round((loadedCount / totalScreens) * 100),
      totalSize: state.totalSize,
      loadedSize: state.loadedSize,
      networkInfo,
      batteryLevel,
      isUserIdle
    };
  }, [screens.length, state, networkInfo, batteryLevel, isUserIdle]);

  // Clear cache
  const clearCache = useCallback(() => {
    componentsRef.current = {};
    setState({
      loaded: new Set(),
      loading: new Set(),
      failed: new Set(),
      progress: {},
      totalSize: 0,
      loadedSize: 0
    });
    loadQueueRef.current = [];
  }, []);

  return {
    loaded: Array.from(state.loaded),
    loading: Array.from(state.loading),
    failed: Array.from(state.failed),
    progress: state.progress,
    getComponent,
    preloadScreen,
    getStats,
    clearCache,
    isPreloaded: (screenId: string) => state.loaded.has(screenId),
    isLoading: (screenId: string) => state.loading.has(screenId),
    hasFailed: (screenId: string) => state.failed.has(screenId)
  };
}