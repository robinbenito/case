import React, { Component } from 'react'
import PropTypes from 'prop-types'

import params from '../utilities/params'

export default (WrappedComponent) => {
  class WithParams extends Component {
    static propTypes = {
      navigation: PropTypes.shape({
        state: PropTypes.shape({
          params: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired,
    }

    render() {
      const { navigation, ...rest } = this.props

      return (
        <WrappedComponent
          navigation={navigation}
          {...params(navigation)}
          {...rest}
        />
      )
    }
  }

  return WithParams
}
