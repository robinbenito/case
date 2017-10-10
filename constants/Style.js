import { Dimensions, StyleSheet } from 'react-native'

export const Colors = {
  black: 'black',
  white: 'white',

  gray: {
    bold: '#333',
    semiBold: '#6d6d6d',
    medium: '#999',
    regular: '#ccc',
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
    text: '#333',
    background: '#f7f7f7',
  },
}

export const Border = {
  borderWidth: StyleSheet.hairlineWidth,
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
