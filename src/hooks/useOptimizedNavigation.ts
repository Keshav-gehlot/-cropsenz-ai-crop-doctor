import { useState, useEffect, useCallback } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  preload?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

interface UseOptimizedNavigationOptions {
  preloadDelay?: number;
  enablePreloading?: boolean;
  maxPreloadItems?: number;
}

export function useOptimizedNavigation(
  items: NavigationItem[],
  options: UseOptimizedNavigationOptions = {}
) {
  const {
    preloadDelay = 1000,
    enablePreloading = true,
    maxPreloadItems = 3
  } = options;

  const [currentPath, setCurrentPath] = useState<string>('');
  const [preloadedItems, setPreloadedItems] = useState<Set<string>>(new Set());
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  // Get current path from URL
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    updatePath();
    window.addEventListener('hashchange', updatePath);
    return () => window.removeEventListener('hashchange', updatePath);
  }, []);

  // Preload high-priority items on mount
  useEffect(() => {
    if (!enablePreloading) return;

    const timer = setTimeout(() => {
      const highPriorityItems = items
        .filter(item => item.priority === 'high' && item.preload)
        .slice(0, maxPreloadItems);

      highPriorityItems.forEach(item => {
        preloadScreen(item.id);
      });
    }, preloadDelay);

    return () => clearTimeout(timer);
  }, [items, enablePreloading, preloadDelay, maxPreloadItems]);

  // Preload screen content
  const preloadScreen = useCallback(async (itemId: string) => {
    if (preloadedItems.has(itemId)) return;

    try {
      // Simulate preloading - in real app, this would load components/data
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setPreloadedItems(prev => new Set([...prev, itemId]));
      console.log(`Preloaded: ${itemId}`);
    } catch (error) {
      console.warn(`Failed to preload ${itemId}:`, error);
    }
  }, [preloadedItems]);

  // Navigate to a screen
  const navigateTo = useCallback(async (path: string) => {
    if (path === currentPath) return;

    setIsNavigating(true);
    
    try {
      // Update navigation history
      setNavigationHistory(prev => [...prev.slice(-9), currentPath].filter(Boolean));
      
      // Find the item for this path
      const targetItem = items.find(item => item.path === path);
      
      // Preload if not already done
      if (targetItem && !preloadedItems.has(targetItem.id)) {
        await preloadScreen(targetItem.id);
      }
      
      // Navigate
      window.location.hash = path;
      setCurrentPath(path);
      
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsNavigating(false);
    }
  }, [currentPath, items, preloadedItems, preloadScreen]);

  // Preload on hover/focus
  const handleItemHover = useCallback((itemId: string) => {
    if (enablePreloading) {
      preloadScreen(itemId);
    }
  }, [enablePreloading, preloadScreen]);

  // Get navigation analytics
  const getNavigationStats = useCallback(() => {
    return {
      currentPath,
      preloadedCount: preloadedItems.size,
      historyLength: navigationHistory.length,
      isNavigating,
      preloadedItems: Array.from(preloadedItems)
    };
  }, [currentPath, preloadedItems, navigationHistory, isNavigating]);

  // Check if item is active
  const isItemActive = useCallback((path: string) => {
    return currentPath === path;
  }, [currentPath]);

  // Check if item is preloaded
  const isItemPreloaded = useCallback((itemId: string) => {
    return preloadedItems.has(itemId);
  }, [preloadedItems]);

  // Get recommended items based on history
  const getRecommendedItems = useCallback(() => {
    const frequencyMap = navigationHistory.reduce((acc, path) => {
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return items
      .map(item => ({
        ...item,
        frequency: frequencyMap[item.path] || 0
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);
  }, [items, navigationHistory]);

  return {
    currentPath,
    navigateTo,
    isNavigating,
    handleItemHover,
    isItemActive,
    isItemPreloaded,
    getNavigationStats,
    getRecommendedItems,
    navigationHistory,
    preloadedItems: Array.from(preloadedItems)
  };
}