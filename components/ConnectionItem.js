import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import gql from 'graphql-tag'
import colors from '../constants/Colors'

const styles = StyleSheet.create({
  connection: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -1,
    borderColor: colors.gray.border,
    borderWidth: 1,
    backgroundColor: colors.gray.background,
    padding: 10,
    overflow: 'hidden',
  },
  isSelected: {
    backgroundColor: '#fff',
  },
})

export default class ConnectionItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.setState({
      isSelected: !this.state.isSelected,
    })

    const { onPress, connection } = this.props
    onPress(connection)
  }

  render() {
    const { connection } = this.props
    const color = colors.channel[connection.visibility]

    const selectedIcon = this.state.isSelected ? (
      <Ionicons
        name="ios-checkmark"
        size={18}
        color="black"
      />
    ) : null

    return (
      <TouchableHighlight onPress={this.onPress}>
        <View style={styles.connection}>
          <Text style={{ color: colors.gray.text }}>{connection.user.name}</Text>
          <Text style={{ color: colors.gray.text }} > / </Text>
          <Text style={{ color }}>{connection.title}</Text>
          {selectedIcon}
        </View>
      </TouchableHighlight>
    )
  }
}

ConnectionItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  connection: PropTypes.shape({
    title: PropTypes.string,
    visibility: PropTypes.string,
  }).isRequired,
}

ConnectionItem.fragments = {
  connection: gql`
    fragment Connection on Channel {
      user {
        name
      }
      slug
      id
      title
      visibility
    }
  `,
}
