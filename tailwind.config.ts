import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Design System Colors
        background: '#f8f9ff',
        'on-background': '#0b1c30',
        primary: {
          DEFAULT: '#2a14b4',
          container: '#4338ca',
          'on-container': '#c1beff',
        },
        'on-primary': '#ffffff',
        'inverse-primary': '#c3c0ff',
        secondary: {
          DEFAULT: '#b5005d',
          container: '#da2676',
          'on-container': '#fffbff',
        },
        'on-secondary': '#ffffff',
        tertiary: {
          DEFAULT: '#570097',
          container: '#7700cc',
          'on-container': '#dbb5ff',
        },
        'on-tertiary': '#ffffff',
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          variant: '#d3e4fe',
          'container-lowest': '#ffffff',
          'container-low': '#eff4ff',
          container: '#e5eeff',
          'container-high': '#dce9ff',
          'container-highest': '#d3e4fe',
        },
        'on-surface': '#0b1c30',
        'on-surface-variant': '#464554',
        'inverse-surface': '#213145',
        'inverse-on-surface': '#eaf1ff',
        outline: {
          DEFAULT: '#777586',
          variant: '#c7c4d7',
        },
        'surface-tint': '#5148d7',
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          'on-container': '#93000a',
        },
        'on-error': '#ffffff',
        // Fixed gradients and branding colors
        'brand-deep-indigo': '#2a14b4',
        'brand-vibrant-magenta': '#b5005d',
        'brand-soft-purple': '#570097',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        base: '8px',
        'container-padding-mobile': '1rem',
        'container-padding-desktop': '2rem',
        gutter: '1.5rem',
        'section-gap': '3rem',
      },
    },
  },
  plugins: [],
};

export default config;

