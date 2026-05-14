/**
 * Tailwind v4: o variant `dark:` NÃO vem deste ficheiro.
 * Modo escuro por classe `.dark` está em `app/globals.css`:
 * `@custom-variant dark (&:where(.dark, .dark *));`
 *
 * Em dev, use `npm run dev` (Webpack). Turbopack ignora esse override e
 * mantém `dark:` ligado a `prefers-color-scheme`, o que quebra o toggle.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}