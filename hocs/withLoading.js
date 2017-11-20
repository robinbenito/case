import React, { Component } from 'react'
import { some, map, pick } from 'lodash'

import LoadingScreen from '../components/LoadingScreen'

const DEFAULT_KEYS = ['data']

export default (WrappedComponent, { dataKeys = DEFAULT_KEYS } = {}) => {
  class WithLoading extends Component {
    render() {
      const datums = pick(this.props, dataKeys)
      const isLoading = some(map(datums, 'loading'))

      if (isLoading) {
        return <LoadingScreen />
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return WithLoading
}
