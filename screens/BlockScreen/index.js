import React from 'react'
import PropTypes from 'prop-types'
import BlockContents from './components/BlockContents'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'

export default class BlockScreen extends React.Component {
  render() {
    const { id, imageLocation } = this.props.navigation.state.params

    return (
      <HeaderAwareContainer>
        <BlockContents
          id={id}
          imageLocation={imageLocation}
        />
      </HeaderAwareContainer>
    )
  }
}

BlockScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
