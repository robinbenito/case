import React, { Component } from 'react'
import { compact, some, map, pick } from 'lodash'

import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'

const DEFAULT_KEYS = ['data']

export default (WrappedComponent, { errorMessage, dataKeys = DEFAULT_KEYS } = {}) => {
  class WithLoadingAndErrors extends Component {
    render() {
      const datums = pick(this.props, dataKeys)
      const isLoading = some(map(datums, 'loading'))
      const errors = compact(map(datums, 'error'))

      if (isLoading) {
        return <LoadingScreen />
      }

      if (errors.length > 0) {
        return (
          <ErrorScreen
            message={errorMessage}
            errors={errors}
          />
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return WithLoadingAndErrors
}
