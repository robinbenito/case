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
import FollowButton from '../../../components/FollowButton'

const IMAGE_SIZE = 50

const styles = StyleSheet.create({
  avatar: {
    width: IMAGE_SIZE + 2,
    height: IMAGE_SIZE + 2,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: layout.padding / 2,
  },
  header: {
    padding: layout.padding,
    paddingBottom: 0,
  },
  innerHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: layout.padding,
    minHeight: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 200,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: layout.padding,
  },
})

const ProfileHeader = ({ user }) => (
  <View style={styles.header}>
    <View style={styles.innerHeader}>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: user.avatar }}
        />
        <View>
          <Text style={styles.headerText}>
            {user.name}
          </Text>
          <HTMLView
            value={user.bio || '–'}
            stylesheet={styles}
          />
        </View>
      </View>
      <FollowButton id={user.id} type="USER" />
    </View>
  </View>
)

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    slug: PropTypes.any,
    bio: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

export default ProfileHeader
