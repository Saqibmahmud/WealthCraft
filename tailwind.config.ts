import type { Config } from "tailwindcss";

export default {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customLightBlue: '#c7d8da',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [ require('flowbite/plugin'),
    'tailwindcss',

    'autoprefixer',],
} satisfies Config;


// tailwind.config.js

