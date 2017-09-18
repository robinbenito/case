import { StyleSheet } from 'react-native'

export const Colors = {
  black: 'black',
  white: 'white',
  gray: {
    bold: '#333',
    semiBold: '#777',
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
  borderWidth: 1.5,
  borderColor: Colors.gray.regular,
  borderRadius: 3,
}

export const Typography = {
  fontWeight: {
    normal: 'normal', // 400
    medium: '500',
    bold: 'bold', // 700
  },
  fontSize: {
    base: 16,
    small: 14,
    xsmall: 11,
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
