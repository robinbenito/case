import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import type from '../constants/Type'
import NavigatorService from '../utilities/navigationService'

const styles = StyleSheet.create({
  channelContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    paddingVertical: layout.padding * 2,
    marginVertical: layout.padding / 2,
    paddingHorizontal: layout.padding,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  channelContainerPrivate: {
    backgroundColor: colors.privateBackground,
    borderColor: colors.privateBackground,
  },
  channelContainerClosed: {
    backgroundColor: colors.closedBackground,
    borderColor: colors.closedBackground,
  },
  channelContainerPublic: {
    backgroundColor: colors.publicBackground,
    borderColor: colors.publicBackground,
  },
  channelContainerSelectedPrivate: {
    borderColor: colors.private,
  },
  channelContainerSelectedClosed: {
    borderColor: colors.closed,
  },
  channelContainerSelectedPublic: {
    borderColor: colors.public,
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
  metaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLine: {
    flex: 1,
    flexDirection: 'row',
  },
  meta: {
    fontSize: type.sizes.normal,
    paddingRight: layout.padding / 2,
  },
  icon: {
    display: 'none',
  },
})

export default class ChannelItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: props.isSelected,
    }
    this.onPressButton = this.onPressButton.bind(this)
  }

  onPressButton() {
    const { onToggleSelect } = this.props
    if (onToggleSelect) {
      this.toggleSelect()
    } else {
      NavigatorService.navigate('channel', { id: this.props.channel.id })
    }
  }

  toggleSelect() {
    const { onToggleSelect, channel } = this.props
    const isSelected = !this.state.isSelected
    this.setState({ isSelected })
    onToggleSelect(channel, isSelected)
  }

  renderMeta() {
    const { channel } = this.props
    const { isSelected } = this.state
    const counts = channel.counts || channel.kind.counts
    const visibility = channel.visibility || channel.kind.visibility
    const textColor = colors[visibility]

    const updatedAt = isSelected ? null : (
      <View style={styles.metaLine}>
        <Text style={[styles.meta, { color: textColor, textAlign: 'right', flex: 1 }]}>
          Updated {channel.updated_at}
        </Text>
      </View>
    )

    return (
      <View style={styles.metaContainer}>
        <View style={styles.metaLine}>
          <Text style={[styles.meta, { color: textColor }]}>
            {channel.user.name}
          </Text>
          <Text style={[styles.meta, { color: textColor }]}>
            •
          </Text>
          <Text style={[styles.meta, { color: textColor }]}>
            {counts.connections} blocks
          </Text>
        </View>
        {updatedAt}
      </View>
    )
  }

  render() {
    const { channel, style } = this.props
    const { isSelected } = this.state
    const visibility = channel.visibility || channel.kind.visibility

    const containerStyle = {
      public: styles.channelContainerPublic,
      closed: styles.channelContainerClosed,
      private: styles.channelContainerPrivate,
    }[visibility]

    const selectedContainerStyle = isSelected ? {
      public: styles.channelContainerSelectedPublic,
      closed: styles.channelContainerSelectedClosed,
      private: styles.channelContainerSelectedPrivate,
    }[visibility] : null

    const selectedIcon = isSelected ? (
      <Ionicons
        name="ios-checkmark-circle"
        size={18}
        color={colors.gray.light}
        style={styles.icon}
      />
    ) : null
    const textColor = colors.channel[visibility]

    return (
      <TouchableOpacity onPress={this.onPressButton}>
        <View style={[styles.channelContainer, containerStyle, selectedContainerStyle, style]}>
          <View style={styles.innerContainer}>
            <Text style={[styles.channelTitle, { color: textColor }]}>
              {channel.title}
            </Text>
            {this.renderMeta()}
          </View>
          {selectedIcon}
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
      counts {
        connections
      }
      user {
        id
        name
      }
    }
  `,
}

ChannelItem.propTypes = {
  isSelected: PropTypes.bool,
  onToggleSelect: PropTypes.any,
  style: PropTypes.any,
  channel: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.any,
    kind: PropTypes.any,
    visibility: PropTypes.any,
    counts: PropTypes.any,
  }).isRequired,
}

ChannelItem.defaultProps = {
  style: {},
  onToggleSelect: null,
  isSelected: false,
}
