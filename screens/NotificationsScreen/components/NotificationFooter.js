import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import styled from 'styled-components/native'

import { NotificationsQuery } from './NotificationContents'
import { NotificationCountQuery } from '../../../components/NotificationCount'
import { Border, Colors } from '../../../constants/Style'
import { H2 } from '../../../components/UI/Texts'

const FOOTER_HEIGHT = 75

const Footer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${FOOTER_HEIGHT};
  border-top-width: ${Border.borderWidth};
  border-top-color: ${Border.borderColor};
`

const Headline = styled(H2)`
  color: ${Colors.gray.semiBold};
`
class NotificationsFooter extends React.Component {
  clearNotifcations = () => {
    this.props.mutate({
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
  }

  render() {
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

