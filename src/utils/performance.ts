interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  connectionType?: string;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private isProduction = import.meta.env.PROD;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  measureRender(componentName: string, renderFn: () => void): void {
    if (!this.isProduction) return;

    const startTime = performance.now();
    renderFn();
    const endTime = performance.now();

    this.logMetric('render', {
      component: componentName,
      duration: endTime - startTime,
      timestamp: Date.now()
    });
  }

  measurePageLoad(): void {
    if (!this.isProduction) return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;

      this.logMetric('pageLoad', {
        loadTime,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstPaint: this.getFirstPaint(),
        timestamp: Date.now()
      });
    });
  }

  getMemoryUsage(): number | undefined {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return undefined;
  }

  getConnectionInfo(): string {
    if ('connection' in navigator) {
      return (navigator as any).connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  private getFirstPaint(): number | undefined {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint?.startTime;
  }

  private logMetric(type: string, data: any): void {
    if (this.isProduction) {
      const metric = {
        type,
        data,
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      };

      const existingMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
      existingMetrics.push(metric);

      if (existingMetrics.length > 100) {
        existingMetrics.splice(0, existingMetrics.length - 100);
      }

      localStorage.setItem('performanceMetrics', JSON.stringify(existingMetrics));
    }
  }

  getMetrics(): any[] {
    return JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
  }

  clearMetrics(): void {
    localStorage.removeItem('performanceMetrics');
  }
}

export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();

  const measureComponent = (componentName: string) => {
    return {
      start: () => {
        const startTime = performance.now();
        return () => {
          const endTime = performance.now();
          monitor.measureRender(componentName, () => {});
        };
      }
    };
  };

  return {
    measureComponent,
    getMetrics: () => monitor.getMetrics(),
    clearMetrics: () => monitor.clearMetrics(),
  };
}

export function initPerformanceMonitoring(): void {
  const monitor = PerformanceMonitor.getInstance();
  monitor.measurePageLoad();
}

export default PerformanceMonitor;
