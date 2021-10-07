module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      /* Colors: */
      underflow_grey: {
        900: '#080708',
        800: '#1C1B1D',
        700: '#363437',
        600: '#504D51',
        500: '#6A666B',
        400: '#848085',
        300: '#9D9A9E',
        200: '#B6B4B7',
        100: '#CFCED0',
        50: '#E8E8E9',
      },
      underflow_blue: {
        900: '#00030F',
        800: '#020E40',
        700: '#031972',
        600: '#0424A4',
        500: '#1036CB',
        400: '#2D51E1',
        300: '#627BDF',
        200: '#94A3E0',
        100: '#C0C8E7',
        50: '#E3E7F7',
      },
      underflow_green: {
        900: '#000F0B',
        800: '#02402F',
        700: '#037253',
        600: '#04A477',
        500: '#10CB96',
        400: '#2DE1AE',
        300: '#62DFBC',
        200: '#94E0CB',
        100: '#C0E7DC',
        50: '#E3F7F1',
      },
      underflow_orange: {
        900: '#0F0800',
        800: '#402202',
        700: '#723D03',
        600: '#A45704',
        500: '#CB7110',
        400: '#E18A2D',
        300: '#DFA362',
        200: '#E0BB94',
        100: '#E7D4C0',
        50: '#F7EDE3',
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}