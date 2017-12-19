import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BlockContents from './components/BlockContents'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'

export default class BlockScreen extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    imageLocation: PropTypes.string,
  }

  static defaultProps = {
    imageLocation: null,
  }

  render() {
    const { id, imageLocation } = this.props

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
