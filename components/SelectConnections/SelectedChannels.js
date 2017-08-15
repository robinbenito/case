import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../constants/Colors'
import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.padding,
    marginBottom: layout.padding * 3,
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
    const { channels } = this.props
    return channels.map((channel, index) => {
      const textColor = colors[channel.visibility]
      const showComma = index < channels.length - 1 
      return (
        <View key={`connection-${channel.id}`} style={styles.channelWord}>
          <Text style={{ color: textColor, fontWeight: 'bold' }}>
            {channel.title}
          </Text>
          {
            showComma && <Text>,</Text>
          }
        </View>
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
}

SelectedChannels.defaultProps = {
  title: 'Untitled block',
}
