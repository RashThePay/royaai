/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

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
            950: '#fdfbed',
            900: '#f8f2cd',
            800: '#f0e28e',
            700: '#ead15f',
            600: '#e5bf3a',
            500: '#dda323',
            400: '#c37f1c',
            300: '#a25d1b',
            200: '#84491c',
            100: '#6d3d1a',
            50: '#3e1f0a',
            background: '#c37f1c',
            foreground: '#454464',
            DEFAULT: '#f0e28e',
          },
          default: {
            950: '#f5f6f988',
            900: '#e7e9f288',
            800: '#d5d8e888',
            700: '#b9bed788',
            600: '#979ec388',
            500: '#7d82b488',
            400: '#6b6ca588',
            300: '#605f968',
            200: '#4d4b7288',
            100: '#45446488',
            50: '#2e2d3e88',
            DEFAULT: '#4d4b7288',
          },


        }
      }
    }
  })]
};
