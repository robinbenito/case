import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import HTMLView from 'react-native-htmlview'
import ContentsToggle from '../../../components/Contents/ContentsToggle'
import UserAvatar from '../../../components/UserAvatar'
import FollowButtonWithData from '../../../components/FollowButton'

import HTMLStyles from '../../../constants/HtmlView'
import layout from '../../../constants/Layout'
import typesize from '../../../constants/Type'

const styles = StyleSheet.create({
  avatar: {
    marginLeft: layout.padding,
    marginRight: layout.padding * 2,
  },
  header: {
    paddingVertical: layout.padding,
    marginBottom: layout.padding,
  },
  innerHeader: {
    paddingBottom: layout.padding * 2,
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
    fontSize: typesize.headline,
    fontWeight: 'bold',
    paddingBottom: layout.padding,
  },
})

const ProfileHeader = ({ user, type, onToggle }) => (
  <View style={styles.header}>
    <View style={styles.innerHeader}>
      <View style={styles.userInfo}>
        <UserAvatar size={50} user={user} style={styles.avatar} />
        <View>
          <Text style={styles.headerText}>
            {user.name}
          </Text>
          <HTMLView
            value={user.bio || '–'}
            stylesheet={HTMLStyles}
            addLineBreaks={null}
          />
        </View>
      </View>
      {
        user.can.follow && <FollowButtonWithData id={user.id} type="USER" />
      }
    </View>
    <ContentsToggle
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
