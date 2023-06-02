/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        main: '#1A94FF',
        // 'blue-500': '#0D5CB6',
        body: '#F5F5FA',
        gray: '#808089',
        black: '#38383d',
        red: '#ff424e',
        prod: '#504d4d',
        divider: '#e7e7e7',
        star: '#fdd940',
      },
      width: {
        container: '75rem',
      },
    },
  },
  plugins: [],
};
