import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import styled from 'styled-components/native'

import { NotificationsQuery } from './NotificationContents'
import { NotificationCountQuery } from '../../../components/NotificationCount'
import { H2 } from '../../../components/UI/Texts'

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
class NotificationsFooter extends React.Component {
  clearNotifcations = () => {
    this.props
      .mutate({
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
      // TODO: Handle errors
      // TODO: Re-direct back to feed
  }

  render() {
    // TODO: Only show this when there are unread messages
    return (
      <Footer onPress={this.clearNotifcations}>
        <Headline>Mark all as read</Headline>
      </Footer>
    )
  }
}

export const MarkNotificationsReadMutation = gql`
  mutation MarkNotificationsAsRead {
    clear_notifications(input: { confirm: true }) {
      me {
        id
      }
    }
  }
`

NotificationsFooter.propTypes = {
  mutate: PropTypes.func.isRequired,
}

export default graphql(MarkNotificationsReadMutation)(NotificationsFooter)
