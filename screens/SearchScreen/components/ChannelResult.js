import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Units, Typography, Colors } from '../../../constants/Style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Units.base,
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  meta: {
    paddingTop: Units.base / 2,
  },
  metaText: {
    fontSize: Typography.fontSize.xsmall,
    color: Colors.gray.semiBold,
  },
})

export default class SearchResultChannelItem extends React.Component {
  render() {
    const { channel } = this.props
    const titleStyle = [styles.text, { color: Colors.channel[channel.visibility] }]
    return (
      <View>
        <Text style={titleStyle}>
          {channel.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.metaText} onPress={this.goToChannel}>
            {channel.user.name} • {channel.updated_at}
          </Text>
        </View>
      </View>
    )
  }
}

SearchResultChannelItem.propTypes = {
  channel: PropTypes.any.isRequired,
}
