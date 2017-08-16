import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../constants/Colors'
import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.padding,
    marginBottom: layout.padding * 3,
  },
  icon: {
    paddingRight: layout.padding / 2,
  },
  labelLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  channelsLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  channelWord: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: layout.padding / 2,
  },
})

export default class SelectedChannels extends React.Component {
  renderChannels() {
    const { channels, onRemove } = this.props
    return channels.map((channel, index) => {
      const textColor = colors[channel.visibility]
      const showComma = index < channels.length - 1
      return (
        <TouchableOpacity key={`connection-${channel.id}`} onPress={() => onRemove(channel)}>
          <View style={styles.channelWord}>
            <Ionicons
              style={styles.icon}
              name="ios-remove-circle-outline"
              size={18}
              color={textColor}
            />
            <Text style={{ color: textColor, fontWeight: 'bold' }}>
              {channel.title}
            </Text>
            {
              showComma && <Text>,</Text>
            }
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { channels, title } = this.props
    if (channels.length) {
      return (
        <View style={styles.container}>
          <View style={styles.labelLine}>
            <Text>Connect </Text>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <Text> to:</Text>
          </View>
          <View style={styles.channelsLine}>
            {this.renderChannels()}
          </View>
        </View>
      )
    }
    return (<View />)
  }
}

SelectedChannels.propTypes = {
  title: PropTypes.string,
  channels: PropTypes.any.isRequired,
  onRemove: PropTypes.func,
}

SelectedChannels.defaultProps = {
  title: 'Untitled block',
  onRemove: () => null,
}
