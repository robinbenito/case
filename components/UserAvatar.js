import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import colors from '../constants/Colors'

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
    },
    initials: {
      fontWeight: 'bold',
      color: colors.gray.text,
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  })

export default class UserAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.styles = getStyles(props.size)
  }

  render() {
    const { user, onPress } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[this.styles.container, this.props.style]}
      >
        <Text style={this.styles.initials} onPress={this.goToProfile}>
          {user.initials}
        </Text>
        <Image source={{ uri: decodeURIComponent(user.avatar) }} style={this.styles.image} />
      </TouchableOpacity>
    )
  }
}

UserAvatar.fragments = {
  avatar: gql`
    fragment Avatar on User {
      name
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
  user: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    initials: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

UserAvatar.defaultProps = {
  size: 40,
  style: {},
  onPress: () => null,
}

