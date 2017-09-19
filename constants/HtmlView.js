import { merge, cloneDeep } from 'lodash'
import { Typography } from './Style'

const baseStyles = {
  p: {
    fontFamily: 'System',
    lineHeight: (Typography.fontSize.base * Typography.lineHeight.base),
    fontSize: Typography.fontSize.base,
  },
  a: {},
}

export const smallStyles = merge(cloneDeep(baseStyles), {
  p: {
    lineHeight: (Typography.fontSize.small * Typography.lineHeight.base),
    fontSize: Typography.fontSize.small,
  },
})

export default baseStyles
