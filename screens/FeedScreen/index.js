import React from 'react'
import AddMenu from '../../components/AddMenu'
import FeedContainer from './components/FeedContainer'
import { Container } from '../../components/UI/Layout'

export default class FeedScreen extends React.Component {
  render() {
    return (
      <Container>
        <FeedContainer limit={20} />
        <AddMenu />
      </Container>
    )
  }
}
