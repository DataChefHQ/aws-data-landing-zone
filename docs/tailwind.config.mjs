/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', ['.dark', '[data-theme="dark"]']],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        background:           'var(--background)',
        foreground:           'var(--foreground)',
        border:               'var(--border)',
        input:                'var(--input)',
        ring:                 'var(--ring)',
        primary: {
          DEFAULT:            'var(--primary)',
          foreground:         'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT:            'var(--secondary)',
          foreground:         'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT:            'var(--accent)',
          foreground:         'var(--accent-foreground)',
        },
        muted: {
          DEFAULT:            'var(--muted)',
          foreground:         'var(--muted-foreground)',
        },
        card: {
          DEFAULT:            'var(--card)',
          foreground:         'var(--card-foreground)',
        },
        popover: {
          DEFAULT:            'var(--popover)',
          foreground:         'var(--popover-foreground)',
        },
        destructive:          'var(--destructive)',
      },
      maxWidth: {
        container: '1280px',
      },
      fontSize: {
        'sm':  ['14px', { lineHeight: '20px' }],
        'base':['16px', { lineHeight: '24px' }],
        'lg':  ['18px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '48px' }],
        '5xl': ['48px', { lineHeight: '60px' }],
      },
      borderRadius: {
        'md':  '12px',
        'lg':  '16px',
        '2xl': '24px',
      },
      spacing: {
        '18': '72px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
