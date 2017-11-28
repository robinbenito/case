import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'
import { propType } from 'graphql-anywhere'

import { Typography, Colors, Units, Border } from '../constants/Style'

const Count = styled.Text`
  font-size: ${Typography.fontSize.base};
  font-weight: ${Typography.fontWeight.medium};
  color: white;
  align-self: center;
`

const Badge = styled.View`
  align-content: center;
  justify-content: center;
  background-color: ${p => (p.hasUnread ? Colors.state.alert : Colors.gray.medium)};
  border-radius: ${Border.borderRadius};
  padding-vertical: ${Units.scale[1] / 2};
  padding-horizontal: ${Units.scale[1]};
`

const Container = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[1]};
`

class NotificationCount extends React.Component {
  render() {
    const {
      data: {
        loading,
        error,
        me,
      },
      onPress,
    } = this.props

    if (loading || error) return <View />

    const { counts } = me

    return (
      <Container onPress={onPress}>
        <Badge hasUnread={counts.notifications > 0}>
          <Count>
            {counts.notifications}
          </Count>
        </Badge>
      </Container>
    )
  }
}

NotificationCount.fragments = {
  unreadNotificationsCount: gql`
    fragment UnreadNotificationsCount on Me {
      id
      counts {
        notifications
      }
    }
  `,
}

NotificationCount.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    me: propType(NotificationCount.fragments.unreadNotificationsCount),
  }),
  onPress: PropTypes.func,
}

NotificationCount.defaultProps = {
  data: {
    loading: true,
  },
  onPress: null,
}

export const NotificationCountQuery = gql`
  query NotificationCountQuery {
    me {
      ...UnreadNotificationsCount
    }
  }
  ${NotificationCount.fragments.unreadNotificationsCount}
`

export default graphql(NotificationCountQuery, {
  options: { pollInterval: 60000 },
})(NotificationCount)
