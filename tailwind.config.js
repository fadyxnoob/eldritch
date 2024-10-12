/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#ff5e14',
        black : '#000',
        light : '#fff',
        facebook : '#1877F2',
        linkedin : '#0077B5',
        instagram : ''
      },
      container : {
        center : true,
        padding : {
          default : '1rem',
          sm : '2rem',
          xl : '5rem',
          '2xl' : '6rem'
        }
      },

      backgroundImage: {
        'instagram': 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
      },

      screens : {
        mobile : {'max' : '375px'},
      }
    },
  },
  plugins: [],
}

