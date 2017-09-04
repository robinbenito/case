import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
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
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    const { navigation } = this.props
    navigation.navigate('DrawerOpen')
  }

  render() {
    const { data } = this.props

    if (data.loading || data.error) {
      return (<View />)
    }

    const extraClass = data.me.counts.notifications > 0 ?
      { backgroundColor: colors.state.alert } :
      {}

    return (
      <TouchableHighlight style={[styles.container, extraClass]} onPress={this.onPress}>
        <Text style={styles.count}>
          {data.me.counts.notifications}
        </Text>
      </TouchableHighlight>
    )
  }
}

export const NotificationCountQuery = gql`
  query NotificationCountQuery {
    me {
      counts {
        notifications
      }
    }
  }
`

NotificationCount.propTypes = {
  data: PropTypes.any.isRequired,
  navigation: PropTypes.any,
}

NotificationCount.defaultProps = {
  data: {},
  navigation: {},
}

export default graphql(NotificationCountQuery)(NotificationCount)
