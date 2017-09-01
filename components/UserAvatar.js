import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import colors from '../constants/Colors'
import type from '../constants/Type'
import layout from '../constants/Layout'

const getStyles = size =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: colors.gray.background,
      borderColor: colors.gray.border,
      borderWidth: 1,
    },
    initials: {
      fontWeight: 'bold',
      fontSize: size > 50 ? type.sizes.subheadline : type.sizes.normal,
      color: colors.gray.text,
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size - 2,
      height: size - 2,
      borderRadius: size / 2,
    },
    nameContainer: {
      alignItems: 'center',
      paddingTop: layout.padding / 2,
    },
    name: {
      fontSize: type.sizes.small,
      width: size,
      textAlign: 'center',
    },
  })

export default class UserAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.styles = getStyles(props.size)
  }

  render() {
    const { user, onPress, includeName, style } = this.props
    const username = includeName ? (
      <View style={[this.styles.nameContainer, style]}>
        <Text numberOfLines={1} style={this.styles.name}>
          {user.first_name}
        </Text>
        <Text numberOfLines={1} style={this.styles.name}>
          {user.last_name}
        </Text>
      </View>
    ) : null

    return (
      <View>
        <TouchableOpacity
          onPress={onPress}
          style={[this.styles.container, style]}
        >
          <Text style={this.styles.initials} onPress={this.goToProfile}>
            {user.initials}
          </Text>
          <Image source={{ uri: decodeURIComponent(user.avatar) }} style={this.styles.image} />
        </TouchableOpacity>
        {username}
      </View>
    )
  }
}

UserAvatar.fragments = {
  avatar: gql`
    fragment Avatar on User {
      first_name
      last_name
      slug
      initials
      avatar(size: SMALL)
    }
  `,
}

UserAvatar.propTypes = {
  size: PropTypes.number,
  style: PropTypes.any,
  onPress: PropTypes.func,
  includeName: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    initials: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

UserAvatar.defaultProps = {
  size: 60,
  style: {},
  onPress: () => null,
  includeName: false,
}

