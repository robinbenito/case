import React, { Component } from 'react'
import { compact, map, pick } from 'lodash'

import ErrorScreen from '../components/ErrorScreen'

const DEFAULT_KEYS = ['data']

export default (WrappedComponent, {
  errorMessage,
  dataKeys = DEFAULT_KEYS,
  showRefresh = false,
} = {}) => {
  class WithErrors extends Component {

    onRefresh = () => {
      const datums = pick(this.props, dataKeys)
      const refetchMethods = compact(map(datums, 'refetch'))
      return map(refetchMethods, method => method({ notifyOnNetworkStatusChange: true }))
    }

    render() {
      const datums = pick(this.props, dataKeys)
      const errors = compact(map(datums, 'error'))

      if (errors.length > 0) {
        return (
          <ErrorScreen
            message={errorMessage}
            errors={errors}
            onRefresh={this.onRefresh}
            showRefresh={showRefresh}
          />
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return WithErrors
}
