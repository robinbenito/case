import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

import NavigatorService from '../utilities/navigationService'

import colors from '../constants/Colors'

const IMAGE_SIZE = 50

const styles = StyleSheet.create({
  container: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
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
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
})

export default class UserAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.goToProfile = this.goToProfile.bind(this)
  }

  goToProfile() {
    NavigatorService.navigate('profile', { id: this.props.user.slug })
  }

  render() {
    const { user } = this.props
    return (
      <TouchableOpacity onPress={this.goToProfile} style={styles.container}>
        <Text style={styles.initials} onPress={this.goToProfile}>
          {user.initials}
        </Text>
        <Image source={{ uri: user.avatar }} style={styles.image} />
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
  user: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    initials: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}
