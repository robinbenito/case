import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default (WrappedComponent) => {
  class PollForBlockAvailability extends Component {
    static propTypes = {
      data: PropTypes.shape({
        error: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        startPolling: PropTypes.func.isRequired,
        stopPolling: PropTypes.func.isRequired,
        block: PropTypes.shape({
          state: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }

    static defaultProps = {
      data: {
        error: null,
        loading: true,
      },
    }

    componentDidMount() {
      const { data: { loading, error, startPolling, block: { state } } } = this.props

      // Block is done loading and is not yet in a terminal state, so start polling for it
      if (!loading && !error && state !== 'available' && state !== 'failed') {
        startPolling(1000)
      }
    }

    componentWillReceiveProps({ data: { block: { state } } }) {
      if (state === 'available' || state === 'failed') {
        this.props.data.stopPolling()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return PollForBlockAvailability
}
