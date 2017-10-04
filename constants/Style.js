import { StyleSheet } from 'react-native'
import chroma from 'chroma-js'

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
  },

  semantic: {
    text: '#333',
    background: '#f7f7f7',
  },
}

Colors.background = value => chroma(`${value}`).alpha(0.05).rgba()

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
  searchBarHeight: 28,
  hairlineWidth: StyleSheet.hairlineWidth,
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
