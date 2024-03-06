/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "purple-dark": {
        extend: "dark", // <- inherit default values from dark theme
        colors: {
          background: "#2e2d3e",
          foreground: "#ffffff",
          primary: {
            50: '#fdfbed',
            100: '#f8f2cd',
            200: '#f0e28e',
            300: '#ead15f',
            400: '#e5bf3a',
            500: '#dda323',
            600: '#c37f1c',
            700: '#a25d1b',
            800: '#84491c',
            900: '#6d3d1a',
            950: '#3e1f0a',
            DEFAULT: '#f0e28e',
        },        
        default: {
          50: '#f5f6f9',
          100: '#e7e9f2',
          200: '#d5d8e8',
          300: '#b9bed7',
          400: '#979ec3',
          500: '#7d82b4',
          600: '#6b6ca5',
          700: '#605f96',
          800: '#4d4b72',
          900: '#454464',
          950: '#2e2d3e',
          DEFAULT:'#4d4b72',
      },
      
        
        }
      }
    }
  })]
};
