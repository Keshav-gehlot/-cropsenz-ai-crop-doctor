import { lazy, Suspense, ComponentType } from 'react';

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  </div>
);

// Generic lazy component wrapper for named exports
export function withLazyLoading<T extends ComponentType<any>>(
  importFunc: () => Promise<{ [key: string]: T }>,
  exportName: string
) {
  const LazyComponent = lazy(async () => {
    const module = await importFunc();
    return { default: module[exportName] as T };
  });
  
  return function WrappedComponent(props: any) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Lazy load heavy components
export const LazyDiagnosisScreen = withLazyLoading(
  () => import('../components/DiagnosisScreen'),
  'DiagnosisScreen'
);

export const LazyEnhancedRemediesScreen = withLazyLoading(
  () => import('../components/EnhancedRemediesScreen'),
  'EnhancedRemediesScreen'
);

export const LazyHistoryScreen = withLazyLoading(
  () => import('../components/HistoryScreen'),
  'HistoryScreen'
);

export const LazyProfileScreen = withLazyLoading(
  () => import('../components/ProfileScreen'),
  'ProfileScreen'
);

export const LazyMarketScreen = withLazyLoading(
  () => import('../components/MarketScreen'),
  'MarketScreen'
);

export const LazyGradingScreen = withLazyLoading(
  () => import('../components/GradingScreen'),
  'GradingScreen'
);

export const LazyRemediesScreen = withLazyLoading(
  () => import('../components/RemediesScreen'),
  'RemediesScreen'
);

export const LazyStorageSuggestionsScreen = withLazyLoading(
  () => import('../components/StorageSuggestionsScreen'),
  'default'
);