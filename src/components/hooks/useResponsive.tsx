import { useState, useEffect } from 'react';

export interface BreakpointValues {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  largeDesktop: boolean;
}

export interface ScreenSize {
  width: number;
  height: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'largeDesktop';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

export function useResponsive(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        breakpoint: 'mobile',
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      breakpoint: getBreakpoint(width),
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024 && width < 1280,
      isLargeDesktop: width >= 1280,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        breakpoint: getBreakpoint(width),
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isLargeDesktop: width >= 1280,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

function getBreakpoint(width: number): 'mobile' | 'tablet' | 'desktop' | 'largeDesktop' {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1280) return 'desktop';
  return 'largeDesktop';
}

export function useResponsiveGrid(
  options: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    largeDesktop?: number;
  } = {}
) {
  const { breakpoint } = useResponsive();

  const defaults = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    largeDesktop: 4,
  };

  const config = { ...defaults, ...options };

  return config[breakpoint];
}

export function useResponsiveSpacing() {
  const { breakpoint } = useResponsive();

  const spacing = {
    mobile: {
      padding: 'p-4',
      margin: 'm-4',
      gap: 'gap-4',
    },
    tablet: {
      padding: 'p-6',
      margin: 'm-6',
      gap: 'gap-6',
    },
    desktop: {
      padding: 'p-8',
      margin: 'm-8',
      gap: 'gap-8',
    },
    largeDesktop: {
      padding: 'p-12',
      margin: 'm-12',
      gap: 'gap-12',
    },
  };

  return spacing[breakpoint];
}

export function useResponsiveFontSize() {
  const { breakpoint } = useResponsive();

  const fonts = {
    mobile: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    tablet: {
      xs: 'text-sm',
      sm: 'text-base',
      base: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
      '2xl': 'text-3xl',
    },
    desktop: {
      xs: 'text-sm',
      sm: 'text-base',
      base: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
      '2xl': 'text-3xl',
    },
    largeDesktop: {
      xs: 'text-base',
      sm: 'text-lg',
      base: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
      '2xl': 'text-4xl',
    },
  };

  return fonts[breakpoint];
}
