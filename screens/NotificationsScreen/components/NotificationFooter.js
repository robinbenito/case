import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'

import NotificationsQuery from '../queries/notifications'
import { NotificationCountQuery } from '../../../components/NotificationCount'

import { H2 } from '../../../components/UI/Texts'

import alertErrors from '../../../utilities/alertErrors'
import navigationService from '../../../utilities/navigationService'

import readAllNotificationsMutation from '../mutations/readAllNotifications'

import { Border, Colors, Units } from '../../../constants/Style'

const Footer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-vertical: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[2]};
  border-top-width: ${Border.borderWidth};
  border-top-color: ${Border.borderColor};
`

const Headline = styled(H2)`
  color: ${Colors.gray.semiBold};
`
class NotificationsFooter extends Component {
  static propTypes = {
    readAllNotifications: PropTypes.func.isRequired,
  }

  state = {
    clearLabel: 'Mark all as read',
  }

  clearNotifcations = () => {
    const { readAllNotifications } = this.props

    this.setState({
      clearLabel: 'Marking...',
    })

    readAllNotifications({
      refetchQueries: [
        {
          query: NotificationsQuery,
          variables: {
            limit: 20,
            offset: 0,
          },
        },
        {
          query: NotificationCountQuery,
        },
      ],
    })
      .then(() => navigationService.back())
      .catch(alertErrors)
  }

  render() {
    const { clearLabel } = this.state

    return (
      <Footer onPress={this.clearNotifcations}>
        <Headline>{clearLabel}</Headline>
      </Footer>
    )
  }
}

export default graphql(readAllNotificationsMutation, {
  name: 'readAllNotifications',
})(NotificationsFooter)
