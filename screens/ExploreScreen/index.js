import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import ExploreHeader from './components/ExploreHeader'
import ExploreContainer from './components/ExploreContainer'
import AddMenu from '../../components/AddMenu'

export default class ExploreScreen extends Component {
  static propTypes = {
    showHeadline: PropTypes.bool,
  }

  static defaultProps = {
    showHeadline: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      type: 'CONNECTABLE',
    }
  }

  onToggleChange = (type) => {
    this.setState({ page: 1, type })
  }

  render() {
    const { type, page } = this.state
    const { showHeadline } = this.props

    const header = (
      <ExploreHeader
        type={type}
        showHeadline={showHeadline}
        onToggleChange={this.onToggleChange}
      />
    )

    return (
      <HeaderAwareContainer>
        <ExploreContainer
          type={type}
          page={page}
          header={header}
        />

        <AddMenu />
      </HeaderAwareContainer>
    )
  }
}
