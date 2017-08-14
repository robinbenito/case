import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import type from '../constants/Type'
import NavigatorService from '../utilities/navigationService'

const styles = StyleSheet.create({
  channelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    paddingVertical: layout.padding * 2,
    marginVertical: layout.padding / 2,
    paddingHorizontal: layout.padding,
    flex: 1,
  },
  channelContainerPrivate: {
    backgroundColor: colors.privateBackground,
  },
  channelContainerClosed: {
    backgroundColor: colors.closedBackground,
  },
  channelContainerPublic: {
    backgroundColor: colors.publicBackground,
  },
  channelTitle: {
    fontSize: type.sizes.medium,
    color: '#000',
    paddingBottom: layout.padding / 2,
  },
  channelTitlePrivate: {
    color: colors.private,
  },
  channelTitleClosed: {
    color: colors.closed,
  },
  channelTitlePublic: {
    color: colors.public,
  },
  meta: {
    fontSize: type.sizes.normal,
    paddingRight: layout.padding / 2,
  },
})

export default class ChannelItem extends Component {
  constructor(props) {
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
  }

  onPressButton() {
    NavigatorService.navigate('channel', { id: this.props.channel.id })
  }

  render() {
    const { channel, style } = this.props
    const visibility = channel.visibility || channel.kind.visibility
    const containerStyle = {
      public: styles.channelContainerPublic,
      closed: styles.channelContainerClosed,
      private: styles.channelContainerPrivate,
    }[visibility]

    const textStyle = {
      public: styles.channelTitlePublic,
      closed: styles.channelTitleClosed,
      private: styles.channelTitlePrivate,
    }[visibility]

    const textColor = colors[visibility]

    return (
      <TouchableOpacity onPress={this.onPressButton}>
        <View style={[styles.channelContainer, containerStyle, style]}>
          <Text style={[styles.channelTitle, textStyle]}>
            {this.props.channel.title}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[styles.meta, { color: textColor }]}>
              {this.props.channel.user.name}
            </Text>
            <Text style={[styles.meta, { color: textColor }]}>
              •
            </Text>
            <Text style={[styles.meta, { color: textColor }]}>
              {this.props.channel.updated_at}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

ChannelItem.fragments = {
  channel: gql`
    fragment ChannelThumb on Channel {
      __typename
      id
      title
      visibility
      updated_at(relative: true)
      user {
        id
        name
      }
    }
  `,
}

ChannelItem.propTypes = {
  style: PropTypes.any,
  channel: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.any,
    kind: PropTypes.any,
    visibility: PropTypes.any,
  }).isRequired,
}

ChannelItem.defaultProps = {
  style: {},
}
