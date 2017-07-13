import React from 'react'
import {
  StyleSheet,
  View,
  Text,

} from 'react-native'
import PropTypes from 'prop-types'

import UserNameText from '../../../components/UserNameText'

import colors from '../../../constants/Colors'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
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

const ChannelHeader = ({ channel }) => {
  const textStyle = {
    public: styles.channelPublic,
    closed: styles.channelClosed,
    private: styles.channelPrivate,
  }[channel.visibility]

  return (
    <View style={styles.header}>
      <View style={styles.innerHeader}>
        <Text style={[styles.headerText, textStyle]}>
          {channel.title}
        </Text>
        <View style={styles.collaborators}>
          <Text style={textStyle}>by </Text>
          <UserNameText style={textStyle} user={channel.user} />
        </View>
      </View>
    </View>
  )
}

ChannelHeader.propTypes = {
  channel: PropTypes.shape({
    visibility: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.any,
  }).isRequired,
}

export default ChannelHeader
