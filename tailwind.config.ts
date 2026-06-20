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
        background: '#07191e',
        foreground: '#ffffff',
        primary: '#02f5a1',
        'primary-dark': '#01d486',
        secondary: '#1a2f35',
        accent: '#0a2a33',
      },
    },
  },
  plugins: [],
};
export default config;
