import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'

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

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  padding-horizontal: ${Units.scale[1]};
`

class NotificationCount extends React.Component {
  render() {
    const { data, onPress } = this.props

    if (data.loading || data.error) return <View />

    return (
      <Container onPress={onPress}>
        <Badge hasUnread={data.me.counts.notifications > 0}>
          <Count>
            {data.me.counts.notifications}
          </Count>
        </Badge>
      </Container>
    )
  }
}

export const NotificationCountQuery = gql`
  query NotificationCountQuery {
    me {
      id
      counts {
        notifications
      }
    }
  }
`

NotificationCount.propTypes = {
  data: PropTypes.any.isRequired,
  onPress: PropTypes.func,
}

NotificationCount.defaultProps = {
  data: {},
  onPress: () => null,
}

export default graphql(NotificationCountQuery, {
  options: { pollInterval: 60000 },
})(NotificationCount)
