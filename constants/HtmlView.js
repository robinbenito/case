import { merge, cloneDeep } from 'lodash'

import type from './Type'

const base = {
  p: {
    padding: 0,
    margin: 0,
    fontFamily: 'Times New Roman',
    lineHeight: type.lineHeights.normal,
    fontSize: type.sizes.middle,
  },
}

export default base

const smallStyles = {
  p: {
    padding: 0,
    margin: 0,
    fontFamily: 'Times New Roman',
    fontSize: type.sizes.normal,
    lineHeight: type.lineHeights.normal,
  },
}

const sansSerif = merge(cloneDeep(base), { p: { fontFamily: 'Arial' } })

export {
  smallStyles,
  sansSerif,
}
