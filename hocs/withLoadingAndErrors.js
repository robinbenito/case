import { flow, partialRight } from 'lodash'

import withLoading from './withLoading'
import withErrors from './withErrors'

export default (WrappedComponent, options = {}) =>
  flow(
    partialRight(withLoading, options),
    partialRight(withErrors, options),
  )(WrappedComponent)
