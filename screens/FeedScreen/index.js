import React from 'react'
import FeedContainer from './components/FeedContainer'
import { Container } from '../../components/UI/Layout'

export default class FeedScreen extends React.Component {
  render() {
    return (
      <Container>
        <FeedContainer limit={20} />
      </Container>
    )
  }
}
