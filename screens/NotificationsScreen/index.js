import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { Container } from '../../components/UI/Layout'
import LoadingScreen from '../../components/LoadingScreen'
import NotificationContents from './components/NotificationContents'
import NotificationsFooter from './components/NotificationFooter'

import withErrors from '../../hocs/withErrors'

import notificationsQuery from './queries/notifications'

class NotificationsScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      refetch: PropTypes.func.isRequired,
      me: PropTypes.shape({
        counts: PropTypes.shape({
          notifications: PropTypes.number.isRequired,
        }).isRequired,
        feed: PropTypes.shape({
          notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
        }).isRequired,
      }),
    }).isRequired,
  }

  onRefresh = () => {
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  render() {
    const { data: { loading, me } } = this.props

    const refreshing = loading && !!me

    if (loading && !me) return <LoadingScreen />

    const {
      counts,
      feed: {
        notifications,
      },
    } = me

    return (
      <Container>
        <NotificationContents
          notifications={notifications.slice().reverse()}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />

        {counts.notifications > 0 &&
          <NotificationsFooter />
        }
      </Container>
    )
  }
}

const DecoratedNotificationsScreen = withErrors(NotificationsScreen)

export default graphql(notificationsQuery)(DecoratedNotificationsScreen)
