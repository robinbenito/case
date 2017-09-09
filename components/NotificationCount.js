import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import typesizes from '../constants/Type'

const styles = StyleSheet.create({
  container: {
    width: layout.padding * 2,
    height: layout.padding * 2,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.lighter,
    borderRadius: layout.padding / 4,
    marginRight: layout.padding,
  },
  count: {
    textAlign: 'center',
    fontSize: typesizes.sizes.small,
    fontWeight: typesizes.weights.semibold,
    color: '#fff',
  },
})

class NotificationCount extends React.Component {
  render() {
    const { data, onPress } = this.props

    if (data.loading || data.error) {
      return (<View />)
    }

    const extraClass = data.me.counts.notifications > 0 ?
      { backgroundColor: colors.state.alert } :
      {}

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, extraClass]} >
          <Text style={styles.count}>
            {data.me.counts.notifications}
          </Text>
        </View>
      </TouchableWithoutFeedback>
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
  options: { pollInterval: 20000 },
})(NotificationCount)
