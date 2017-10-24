import React from 'react'

import FeedContainer from './components/FeedContainer'
import { Container } from '../../components/UI/Layout'
import { sendAlert } from '../../components/Alerts'

import currentUserService from '../../utilities/currentUserService'

export default class FeedScreen extends React.Component {
  componentDidMount() {
    if (currentUserService.sync.get('is_pending_confirmation')) {
      sendAlert({
        id: 'is_pending_confirmation',
        type: 'confirmation',
        route: 'feed', // Manually pass in route name, because `feed` is sometimes `main`
        children: 'Please check your email to confirm your account.',
      })
    }
  }
  render() {
    return (
      <Container>
        <FeedContainer limit={20} />
      </Container>
    )
  }
}
