import { merge, cloneDeep } from 'lodash'

import type from './Type'

const base = {
  p: {
    padding: 0,
    margin: 0,
    fontFamily: 'Times New Roman',
    lineHeight: 15,
    fontSize: type.sizes.normal,
  },
}

export default base

const smallStyles = {
  p: {
    padding: 0,
    margin: 0,
    fontFamily: 'Times New Roman',
    fontSize: type.sizes.small,
    lineHeight: 15,
  },
}

const sansSerif = merge(cloneDeep(base), { p: { fontFamily: 'Arial' } })

export {
  smallStyles,
  sansSerif,
}
