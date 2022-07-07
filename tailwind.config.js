/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './templates/**/*.twig'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1060px',
        xl: '1280px',
      },
    },
    screens: {
      xl: { max: '1280px' },
      lg: { max: '1080px' },
      md: { max: '768px' },
      sm: { max: '640px' },
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: ['1rem', '1.625'],
      lg: ['1.125rem', '1.625'],
      xl: ['1.25rem', '1.625'],
      '2xl': ['1.5rem', '1.15'],
      '3xl': ['1.875rem', '1.15'],
      '4xl': ['2.25rem', '1.15'],
      '5xl': ['3rem', '1.15'],
      '6xl': ['4rem', '1.15'],
      '7xl': ['5rem', '1.15'],
      '8xl': ['6rem', '1.15'],
      '9xl': ['8rem', '1.15'],
    },
    extend: {
      colors: {
        primary: {
          900: '#153C3C',
          800: '#214646',
          700: '#416262',
        },
        secondary: {
          900: '#ADC9A6',
          700: '#E6EFE4',
        },
      },
      fontFamily: {
        sans: ["'Satoshi'", 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-.015em',
        tighter: '-.04em',
      },
      maxWidth: {
        '5xl': '66.25rem',
      },
      backgroundImage: {
        'img-usericon': "url('./assets/img/user-icon.svg')",
        'img-emailicon': "url('./assets/img/email-icon.svg')",
      },
      backgroundSize: {
        'size-icon': '1.6rem',
      },
      backgroundPosition: {
        'pos-icon': 'left .8rem center',
      },
      gridTemplateColumns: {
        footer: '2.5fr 1fr 1fr 1fr',
        'footer-mob': '1.75fr 1fr 1fr 1fr',
      },
      height: {
        30: '7.5rem',
      },
      inset: {
        30: '7.5rem',
      },
      scale: {
        400: '400%',
      },
      boxShadow: {
        form: '2px 2px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  safelist: process.env.NODE_ENV === 'development' ? [{ pattern: /.*/ }] : [],
};
