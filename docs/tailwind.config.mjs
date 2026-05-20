/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['selector', ':root[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'dlz-bg':        'var(--dlz-bg)',
        'dlz-fg':        'var(--dlz-fg)',
        'dlz-border':    'var(--dlz-border)',
        'dlz-accent':    'var(--dlz-accent)',
        'dlz-muted':     'var(--dlz-muted)',
        'dlz-primary':   'var(--dlz-primary)',
        'dlz-highlight': 'var(--dlz-highlight)',
        'dlz-popover':   'var(--dlz-popover)',
        'dlz-input':     'var(--dlz-input)',
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
