import React from 'react'

import { defer } from 'lodash'

import currentUserService from '../../utilities/currentUserService'

import FeedContainer from './components/FeedContainer'
import { Container } from '../../components/UI/Layout'
import { sendAlert } from '../../components/Alerts'

export default class FeedScreen extends React.Component {
  componentDidMount() {
    defer(() => {
      if (!currentUserService.sync.get('is_pending_confirmation')) return

      sendAlert({
        type: 'confirmation',
        children: 'Please check your email to confirm your account.',
      })
    })
  }

  render() {
    return (
      <Container>
        <FeedContainer limit={20} />
      </Container>
    )
  }
}
