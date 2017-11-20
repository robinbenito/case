import { compose } from 'react-apollo'

import withLoading from './withLoading'
import withErrors from './withErrors'

export default (WrappedComponent, options = {}) =>
  compose(withLoading, withErrors)(WrappedComponent, options)

