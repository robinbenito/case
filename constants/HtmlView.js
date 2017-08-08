import { merge } from 'lodash'

const base = {
  p: {
    padding: 0,
    margin: 0,
    fontFamily: 'Times New Roman',
    lineHeight: 20,
  },
}

export default base

const smallStyles = {
  p: {
    padding: 0,
    margin: 0,
    fontFamily: 'Times New Roman',
    fontSize: 12,
    lineHeight: 15,
  },
}

const sansSerif = merge(base, { p: { fontFamily: 'Arial' } })

export {
  smallStyles,
  sansSerif,
}
