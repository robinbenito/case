import React from 'react'

import ExploreContainer from './components/ExploreContainer'
import { Container } from '../../components/UI/Layout'
import AddMenu from '../../components/AddMenu'

export default class ExploreScreen extends React.Component {
  render() {
    return (
      <Container>
        <ExploreContainer
          type="CHANNEL"
          page={1}
        />
        <AddMenu />
      </Container>
    )
  }
}
