import React from 'react'
import {
  StyleSheet,
  View,
  Text,

} from 'react-native'
import PropTypes from 'prop-types'

import UserNameText from '../../../components/UserNameText'
import TabToggle from '../../../components/TabToggle'
import FollowButtonWithData from '../../../components/FollowButton'

import colors from '../../../constants/Colors'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
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
  channelInfo: {
    maxWidth: 300,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: layout.padding,
  },
  collaborators: {
    flexDirection: 'row',
  },
  channelPrivate: {
    color: colors.private,
  },
  channelClosed: {
    color: colors.closed,
  },
  channelPublic: {
    color: colors.public,
  },
})

const ChannelHeader = ({ channel, type, onToggle }) => {
  const textStyle = {
    public: styles.channelPublic,
    closed: styles.channelClosed,
    private: styles.channelPrivate,
  }[channel.visibility]

  return (
    <View style={styles.header}>
      <View style={styles.innerHeader}>
        <View style={styles.channelInfo}>
          <Text style={[styles.headerText, textStyle]}>
            {channel.title}
          </Text>
          <View style={styles.collaborators}>
            <Text style={textStyle}>by </Text>
            <UserNameText style={textStyle} user={channel.user} />
          </View>
        </View>
        {
          channel.can.follow && <FollowButtonWithData id={channel.id} type="CHANNEL" />
        }
      </View>
      <TabToggle
        selectedSegment={type}
        onToggleChange={onToggle}
      />
    </View>
  )
}

ChannelHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  onToggle: PropTypes.func,
  channel: PropTypes.shape({
    id: PropTypes.any,
    visibility: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.any,
    can: PropTypes.any,
  }).isRequired,
}

ChannelHeader.defaultProps = {
  onToggle: () => null,
}

export default ChannelHeader
