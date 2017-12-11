import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ExploreContainer from './components/ExploreContainer'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import AddMenu from '../../components/AddMenu'

export default class ExploreScreen extends Component {
  static propTypes = {
    showHeadline: PropTypes.bool,
  }

  static defaultProps = {
    showHeadline: false,
  }

  render() {
    const { showHeadline } = this.props

    return (
      <HeaderAwareContainer>
        <ExploreContainer
          type="CHANNEL"
          page={1}
          showHeadline={showHeadline}
        />
        <AddMenu />
      </HeaderAwareContainer>
    )
  }
}
