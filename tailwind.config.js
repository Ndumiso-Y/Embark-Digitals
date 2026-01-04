/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // From your logo palette
        brand: {
          500: "#3f9eab", // teal (light sections / accents)
          600: "#2e7889", // blue-green (hover/links)
          700: "#28697a", // muted teal (primary buttons / headings)
          900: "#204f5f"  // deep slate (footer / strong bands)
        },
        accent: {
          500: "#f09364" // orange (CTA emphasis)
        }
      }
    }
  },
  plugins: []
}
