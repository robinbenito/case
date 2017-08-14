import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import Type from '../constants/Type'
import NavigatorService from '../utilities/navigationService'

const styles = StyleSheet.create({
  channelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    paddingVertical: Layout.padding * 2,
    marginVertical: Layout.padding / 2,
    paddingHorizontal: Layout.padding,
    flex: 1,
  },
  channelContainerPrivate: {
    backgroundColor: Colors.privateBackground,
  },
  channelContainerClosed: {
    backgroundColor: Colors.closedBackground,
  },
  channelContainerPublic: {
    backgroundColor: Colors.publicBackground,
  },
  channelTitle: {
    fontSize: Type.subheadline,
    color: '#000',
    paddingBottom: Layout.padding / 2,
  },
  channelTitlePrivate: {
    color: Colors.private,
  },
  channelTitleClosed: {
    color: Colors.closed,
  },
  channelTitlePublic: {
    color: Colors.public,
  },
  meta: {
    fontSize: Type.normal,
    paddingRight: Layout.padding / 2,
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

    const textColor = Colors[visibility]

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
