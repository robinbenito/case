import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'

export default (WrappedComponent, { errorMessage } = {}) => {
  class WithLoadingAndErrors extends Component {
    static propTypes = {
      data: PropTypes.shape({
        error: PropTypes.object,
        loading: PropTypes.bool.isRequired,
      }).isRequired,
    }

    static defaultProps = {
      data: {
        error: null,
        loading: true,
      },
    }

    render() {
      // TODO: Support multiple data sources
      const { data: { loading, error } } = this.props

      if (loading) {
        return <LoadingScreen />
      }

      if (error) {
        return (
          <ErrorScreen
            message={errorMessage}
            error={error}
          />
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return WithLoadingAndErrors
}
