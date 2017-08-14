import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import HTMLView from 'react-native-htmlview'
import TabToggle from '../../../components/TabToggle'
import UserAvatar from '../../../components/UserAvatar'
import FollowButtonWithData from '../../../components/FollowButton'

import { sansSerif } from '../../../constants/HtmlView'
import layout from '../../../constants/Layout'
import typevalues from '../../../constants/Type'

const styles = StyleSheet.create({
  avatar: {
    marginRight: layout.padding * 2,
  },
  header: {
    paddingVertical: layout.padding * 2,
  },
  innerHeader: {
    paddingHorizontal: layout.padding * 2,
    marginBottom: layout.padding,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 180,
  },
  headerText: {
    fontSize: typevalues.sizes.headline,
    fontWeight: '600',
    paddingBottom: layout.padding / 2,
  },
})

const ProfileHeader = ({ user, type, onToggle }) => (
  <View style={styles.header}>
    <View style={styles.innerHeader}>
      <View style={styles.userInfo}>
        <UserAvatar user={user} style={styles.avatar} />
        <View>
          <Text style={styles.headerText}>
            {user.name}
          </Text>
          <HTMLView
            value={user.bio || '–'}
            stylesheet={sansSerif}
            addLineBreaks={false}
          />
        </View>
      </View>
      {
        user.can.follow && <FollowButtonWithData id={user.id} type="USER" />
      }
    </View>
    <TabToggle
      selectedSegment={type}
      onToggleChange={onToggle}
    />
  </View>
)

ProfileHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  onToggle: PropTypes.func,
  user: PropTypes.shape({
    slug: PropTypes.any,
    bio: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    can: PropTypes.any,
  }).isRequired,
}

ProfileHeader.defaultProps = {
  onToggle: () => null,
}

export default ProfileHeader
