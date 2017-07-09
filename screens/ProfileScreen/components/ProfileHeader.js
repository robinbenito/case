import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import HTMLView from 'react-native-htmlview'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 75,
    height: 75,
  },
  header: {
    padding: layout.padding,
    paddingBottom: 0,
  },
  innerHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: layout.padding,
    minHeight: 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: layout.padding,
  },
})

const ProfileHeader = ({ user }) => (
  <View style={styles.header}>
    <View style={styles.innerHeader}>
      <Text style={styles.headerText}>
        {user.name}
      </Text>
      <HTMLView
        value={user.bio}
        stylesheet={styles}
      />
      <Image
        style={styles.avatar}
        source={{ uri: user.avatar }}
      />
    </View>
  </View>
)

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    bio: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

export default ProfileHeader
