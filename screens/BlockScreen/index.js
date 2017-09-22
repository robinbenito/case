import React from 'react'
import PropTypes from 'prop-types'
import BlockContents from './components/BlockContents'
import { Container } from '../../components/UI/Layout'

export default class BlockScreen extends React.Component {
  render() {
    const { id, imageLocation } = this.props.navigation.state.params

    return (
      <Container>
        <BlockContents
          id={id}
          imageLocation={imageLocation}
        />
      </Container>
    )
  }
}

BlockScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
