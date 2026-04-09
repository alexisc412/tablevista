import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Core brand ──────────────────────────────────────────
        forest: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',   // lime accent
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',   // PRIMARY — deep forest green
          900: '#14532d',
          950: '#052e16',
        },
        // ── Terracotta — smooth warm sienna (remplace orange agressif) ──
        ember: {
          50:  '#fdf6f3',
          100: '#faeae3',
          200: '#f4d0c2',
          300: '#ecac91',
          400: '#e07d59',
          500: '#d4613a',   // ACCENT — terracotta doux
          600: '#b84c2b',
          700: '#963b22',
          800: '#7a2f1b',
          900: '#632615',
        },
        // ── Ocre doré — accent chaud ──
        gold: {
          50:  '#fffbeb',
          100: '#fef3c0',
          200: '#fde482',
          300: '#f9ca3e',
          400: '#f0ae12',
          500: '#d4920d',   // ocre/doré muted
          600: '#a96e0a',
          700: '#84550a',
          800: '#684309',
          900: '#563609',
        },
        nature: {
          50:  '#faf5ec',   // parchemin chaud — fond principal
          100: '#f4e9d6',   // carton / kraft paper
          200: '#ead9c0',
          300: '#d9c4a0',
          400: '#c4a87c',
          500: '#a88a5c',
          600: '#8c7048',
          700: '#6b5436',
          800: '#4a3a26',
          900: '#312618',
        },
        sage: {
          50:  '#f2faf5',   // vert très léger
          100: '#d8f0e2',
          200: '#a8dfc0',
          300: '#6ec89a',
          400: '#3aaa74',
          500: '#1c8c5a',
          600: '#127248',
        },
        // ── shadcn/ui tokens ──────────────────────────────────────
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
      },

      fontFamily: {
        sans:    ['var(--font-inter)',     'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      borderRadius: {
        lg:  'var(--radius)',
        md:  'calc(var(--radius) - 2px)',
        sm:  'calc(var(--radius) - 4px)',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        'soft':        '0 2px 16px rgba(22, 101, 52, 0.07)',
        'card':        '0 2px 8px rgba(22, 101, 52, 0.06), 0 8px 32px rgba(22, 101, 52, 0.08)',
        'card-hover':  '0 8px 24px rgba(22, 101, 52, 0.12), 0 24px 64px rgba(22, 101, 52, 0.10)',
        'green-glow':  '0 0 0 1px rgba(22, 101, 52, 0.10), 0 8px 40px rgba(22, 101, 52, 0.24)',
        'orange-glow': '0 0 0 1px rgba(249, 115, 22, 0.12), 0 8px 40px rgba(249, 115, 22, 0.28)',
        'glass':       '0 8px 40px rgba(22, 101, 52, 0.08), inset 0 1px 0 rgba(255,255,255,0.55)',
        'inner-soft':  'inset 0 1px 4px rgba(22, 101, 52, 0.08)',
        'lift':        '0 20px 60px rgba(22, 101, 52, 0.15), 0 4px 16px rgba(22, 101, 52, 0.08)',
        'petal':       '0 8px 32px -4px rgba(22,101,52,0.18), 0 2px 8px -2px rgba(249,115,22,0.10)',
      },

      backgroundImage: {
        'gradient-eco':    'linear-gradient(135deg, #166534 0%, #15803d 50%, #3aaa74 100%)',
        'gradient-warm':   'linear-gradient(135deg, #d4613a 0%, #e07d59 50%, #d4920d 100%)',
        'gradient-hero-v': 'linear-gradient(160deg, #052e16 0%, #166534 55%, #1d7a42 100%)',
        'gradient-hero-r': 'linear-gradient(110deg, #166534 0%, #4ade80 45%, #f97316 100%)',
        'gradient-card':   'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(245,240,232,0.55))',
        'gradient-nature': 'linear-gradient(180deg, #faf9f6 0%, #f5f0e8 100%)',
        'leaf-pattern':    "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 C28 18 16 30 20 50 C24 68 54 68 60 50 C64 30 52 18 40 8Z' fill='%23166534' opacity='0.032'/%3E%3Cpath d='M68 48 C62 40 52 38 50 50 C48 62 58 66 68 62 C74 56 74 54 68 48Z' fill='%23166534' opacity='0.025'/%3E%3C/svg%3E\")",
        'dot-pattern':     "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23166534' fill-opacity='0.055'/%3E%3C/svg%3E\")",
        'grid-pattern':    "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L40 0 M0 0 L0 40' stroke='%23166534' stroke-opacity='0.04' stroke-width='1'/%3E%3C/svg%3E\")",
      },

      keyframes: {
        // shadcn
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        // Custom
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-10px) rotate(1.5deg)' },
          '66%':      { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg) translateX(0)' },
          '50%':      { transform: 'rotate(4deg) translateX(4px)' },
        },
        leaf: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(1)' },
          '50%':      { transform: 'rotate(3deg) scale(1.05)' },
        },
        counter: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(74,222,128,0)' },
        },
        'pulse-dot': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.5)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(249,115,22,0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        'badge-in': {
          from: { opacity: '0', transform: 'scale(0.7) translateY(6px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'leaf-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '25%':       { transform: 'translateY(-14px) rotate(4deg) scale(1.03)' },
          '50%':       { transform: 'translateY(-8px) rotate(-3deg) scale(0.98)' },
          '75%':       { transform: 'translateY(-18px) rotate(6deg) scale(1.04)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'gentle-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.02)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'float':          'float 7s ease-in-out infinite',
        'float-slow':     'float 11s ease-in-out infinite',
        'float-fast':     'float 5s ease-in-out infinite',
        'sway':           'sway 5s ease-in-out infinite',
        'leaf':           'leaf 6s ease-in-out infinite',
        'counter':        'counter 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'shimmer':        'shimmer 2.2s linear infinite',
        'fade-up':        'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'scale-in':       'scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'pulse-green':    'pulse-green 2.2s ease-in-out infinite',
        'pulse-dot':      'pulse-dot 2s ease-in-out infinite',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        'badge-in':       'badge-in 0.5s cubic-bezier(0.34,1.4,0.64,1) forwards',
        'slide-right':    'slide-right 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'leaf-float':     'leaf-float 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
        'leaf-float-2':   'leaf-float 11s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite reverse',
        'leaf-float-3':   'leaf-float 6.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'gentle-scale':   'gentle-scale 3s ease-in-out infinite',
      },

      transitionTimingFunction: {
        organic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        spring:  'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
