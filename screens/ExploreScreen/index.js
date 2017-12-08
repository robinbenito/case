import React from 'react'
import PropTypes from 'prop-types'

import ExploreContainer from './components/ExploreContainer'
import { Container } from '../../components/UI/Layout'
import AddMenu from '../../components/AddMenu'

export default class ExploreScreen extends React.Component {
  static propTypes = {
    showHeadline: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    showHeadline: false,
  }

  render() {
    const { navigation } = this.props
    const showHeadline = (
      (navigation.state.params && navigation.state.params.showHeadline) ||
      this.props.showHeadline
    )

    return (
      <Container>
        <ExploreContainer
          type="CHANNEL"
          page={1}
          showHeadline={showHeadline}
        />
        <AddMenu />
      </Container>
    )
  }
}
