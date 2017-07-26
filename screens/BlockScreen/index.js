import React from 'react'
import PropTypes from 'prop-types'

import BlockContents from './components/BlockContents'

export default class BlockScreen extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params
    return (
      <BlockContents id={id} />
    )
  }
}

BlockScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
