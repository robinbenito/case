import { StyleSheet } from 'react-native'

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
    alert: '#e24d4d',
  },
  channel: {
    closed: '#4b3d67',
    public: '#17ac10',
    private: '#b60202',
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
    normal: 'normal', // 400
    medium: '700',
    semiBold: '700', // Alias for medium
    bold: '800',
  },
  fontSize: {
    h1: 24,
    h2: 18,
    h3: 17,
    h4: 15,
    base: 14,
    small: 12,
    tiny: 10,

    // base: 16, // DELETE THIS
    small: 14, // DELETE THIS
    xsmall: 11, // DELETE THIS
  },
  lineHeight: {
    base: 1.5,
    compact: 1.33, // DELETE THIS
  },
}

// Equivalient to one line-height
const base = Typography.fontSize.base * Typography.lineHeight.base

export const Units = {
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
