export const appTheme = {
  colors: {
    product: {
      red: {
        dark: '#BF3B44',
        mid: '#F3BABD',
        light: '#F4E6E7',
      },
      green: {
        dark: '#639339',
        mid: '#CBE4B4',
        light: '#E5F0DB',
      },
    },
    base: {
      gray: {
        gray1: '#1B1D1E',
        gray2: '#333638',
        gray3: '#5C6265',
        gray4: '#B9BBBC',
        gray5: '#DDDEDF',
        gray6: '#EFF0F0',
        gray7: '#FAFAFA',
        white: '#FFFFFF',
      },
    },
  },
  fonts: {
    family: {
      regular: 'NunitoSans_400Regular',
      bold: 'NunitoSans_700Bold',
    },
    lineHeight: '130%',
    sizes: {
      s_12: 12,
      s_14: 14,
      s_16: 16,
      s_18: 18,
      s_24: 24,
      s_32: 32,
    },
  },
}

export type IAppTheme = typeof appTheme
