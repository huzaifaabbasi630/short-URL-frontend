import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0FDF4',
        foreground: '#14532D',
        primary: '#16A34A',
        'primary-dark': '#15803D',
        secondary: '#FFFFFF',
        accent: '#DCFCE7',
        'accent-dark': '#BBF7D0',
      },
    },
  },
  plugins: [],
};
export default config;
