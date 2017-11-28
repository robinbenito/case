import React from 'react'

import { Container } from '../../components/UI/Layout'
import NotificationContents from './components/NotificationContents'
import NotificationsFooter from './components/NotificationFooter'

export default class NotificationsScreen extends React.Component {
  render() {
    return (
      <Container>
        <NotificationContents />
        <NotificationsFooter />
      </Container>
    )
  }
}
