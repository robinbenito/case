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
import typevalues from '../../../constants/Type'

const styles = StyleSheet.create({
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
  channelInfo: {
    maxWidth: layout.infoWidth,
  },
  headerText: {
    fontSize: typevalues.sizes.headline,
    fontWeight: typevalues.weights.semibold,
    paddingBottom: layout.padding,
  },
  smallText: {
    fontSize: typevalues.sizes.normal,
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

const tabOptions = {
  Channels: 'CHANNEL',
  Blocks: 'BLOCK',
}

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
            <Text style={[textStyle, styles.smallText]}>by </Text>
            <UserNameText style={[textStyle, styles.smallText]} user={channel.user} />
          </View>
        </View>
        {
          channel.can.follow && <FollowButtonWithData id={channel.id} type="CHANNEL" />
        }
      </View>
      <TabToggle
        selectedSegment={type}
        onToggleChange={onToggle}
        options={tabOptions}
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
