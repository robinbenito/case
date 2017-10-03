import { merge, cloneDeep } from 'lodash'
import { Typography, Units } from './Style'

const baseStyles = {
  p: {
    fontFamily: 'System',
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeightFor(Typography.fontSize.base),
    marginBottom: Units.scale[2],
  },
  a: {},
}

export const smallStyles = merge(cloneDeep(baseStyles), {
  p: {
    fontSize: Typography.fontSize.small,
    lineHeight: Typography.lineHeightFor(Typography.fontSize.small),
    marginBottom: Units.scale[1],
  },
})

export default baseStyles
