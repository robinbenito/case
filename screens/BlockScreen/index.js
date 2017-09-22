import React from 'react'
import PropTypes from 'prop-types'

import BlockContents from './components/BlockContents'

export default class BlockScreen extends React.Component {
  render() {
    console.log('BlockScreen', this.props.navigation)
    const { id, imageLocation } = this.props.navigation.state.params
    return (
      <BlockContents id={id} imageLocation={imageLocation} />
    )
  }
}

BlockScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
