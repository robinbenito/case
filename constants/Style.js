import { Dimensions, StyleSheet } from 'react-native'

export const Colors = {
  black: 'black',
  white: 'white',

  gray: {
    bold: '#333',
    semiBold: '#6d6d6d',
    medium: '#999',
    regular: '#ccc',
    semiLight: '#e8e8e8',
    light: '#eee',
  },

  state: {
    premium: '#00c5ff',
    alert: 'rgb(255, 100, 0)',
  },

  channel: {
    closed: 'rgb(58, 44, 106)',
    public: 'rgb(66, 133, 60)',
    private: 'rgb(165, 0, 0)',

    background: {
      closed: 'rgb(245, 245, 248)',
      public: 'rgb(245, 248, 245)',
      private: 'rgb(250, 242, 242)',
    },
  },

  semantic: {
    text: 'rgb(109, 109, 109)',
    background: '#f7f7f7',
    label: {
      active: 'black',
      default: 'rgb(109, 109, 109)',
      secondary: 'rgb(151, 151, 151)',
    },
    divider: 'rgb(151, 151, 151)',
    border: 'rgb(151, 151, 151)',
  },

  alert: {
    alert: {
      background: 'rgb(255, 100, 0)',
      foreground: 'white',
    },
    premium: {
      background: 'rgb(55, 145, 230)',
      foreground: 'white',
    },
    confirmation: {
      background: 'rgb(210, 255, 205)',
      foreground: 'black',
    },
    tip: {
      background: 'rgb(109, 109, 109)',
      foreground: 'white',
    },
  },
}

export const Border = {
  borderWidth: StyleSheet.hairlineWidth,
  borderWidthMedium: 1,
  borderColor: Colors.gray.regular,
  borderRadius: 3,
}

export const Typography = {
  fontWeight: {
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },

  fontSize: {
    h1: 24,
    h2: 18,

    large: 24, // h1
    medium: 18, // h2
    smedium: 16,
    base: 14,
    small: 12,
    tiny: 10,
  },

  lineHeight: {
    base: 1.5,
    compact: 1.25,
  },
}

Typography.lineHeightFor = (size, lineHeight = 'base') => {
  let value = size
  if (typeof size === 'string') value = Typography.fontSize[size]
  return value * Typography.lineHeight[lineHeight]
}

// Equivalient to one line-height
const base = Typography.lineHeightFor(Typography.fontSize.base)

export const Units = {
  statusBarHeight: 20,
  hairlineWidth: StyleSheet.hairlineWidth,
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  base,
  scale: [
    0,
    (base / 4),
    (base / 2),
    base,
    (base * 2),
    (base * 4),
  ],
}
