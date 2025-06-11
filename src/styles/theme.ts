import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    // Background layers
    background: {
      primary: '#0a0a0a',
      secondary: '#111111',
      tertiary: '#1a1a1a',
      card: '#161616',
      overlay: 'rgba(10, 10, 10, 0.95)',
    },
    
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      tertiary: '#999999',
      accent: '#ff6b35',
    },
    
    // Artist-focused brand colors
    brand: {
      primary: '#ff6b35',    // Warm orange
      secondary: '#f7931e',  // Golden orange
      tertiary: '#ffcc02',   // Bright yellow
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%)',
      glow: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3) 0%, rgba(247, 147, 30, 0.3) 50%, rgba(255, 204, 2, 0.3) 100%)',
    },
    
    // State colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Glass effects
    glass: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: 'rgba(255, 255, 255, 0.05)',
      shadow: 'rgba(0, 0, 0, 0.6)',
    },
  },
  
  typography: {
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "'Playfair Display', Georgia, serif",
      mono: "'JetBrains Mono', Consolas, monospace",
    },
    sizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
      '9xl': '8rem',     // 128px
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2,
    },
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
    '6xl': '12rem',  // 192px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '50%',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(255, 107, 53, 0.3)',
    'glow-strong': '0 0 40px rgba(255, 107, 53, 0.4)',
    'glow-soft': '0 0 15px rgba(255, 107, 53, 0.2)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  animations: {
    duration: {
      instant: '0.1s',
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
      slower: '0.8s',
      slowest: '1.2s',
    },
    timing: {
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
    max: 9999,
  },
};

// Type declarations for styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        card: string;
        overlay: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        accent: string;
      };
      brand: {
        primary: string;
        secondary: string;
        tertiary: string;
        gradient: string;
        glow: string;
      };
      success: string;
      warning: string;
      error: string;
      info: string;
      glass: {
        background: string;
        border: string;
        shadow: string;
      };
    };
    typography: {
      fonts: {
        primary: string;
        display: string;
        mono: string;
      };
      sizes: Record<string, string>;
      weights: Record<string, number>;
      lineHeight: Record<string, number>;
    };
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    shadows: Record<string, string>;
    breakpoints: Record<string, string>;
    animations: {
      duration: Record<string, string>;
      timing: Record<string, string>;
    };
    zIndex: Record<string, number>;
  }
} 