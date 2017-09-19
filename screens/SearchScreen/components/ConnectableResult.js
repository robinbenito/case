import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Units, Typography, Colors } from '../../../constants/Style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  meta: {
    paddingTop: Units.base / 2,
  },
  metaText: {
    fontSize: Typography.fontSize.small,
    color: Colors.gray.semiBold,
  },
})

export default class SearchResultConnectableItem extends React.Component {
  render() {
    const { connectable } = this.props
    const { kind: { __typename: kindType } } = connectable
    const titleStyle = styles.text

    const ConnectableImage = connectable.kind.image_url ? (
      <View>
        <Image
          cache="force-cache"
          style={styles.image}
          source={{ uri: connectable.kind.image_url, cache: 'force-cache' }}
        />
      </View>
    ) : null

    return (
      <View style={styles.container}>
        <View>
          <Text style={titleStyle}>
            {connectable.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText} onPress={this.goToChannel}>
              {kindType} • {connectable.user.name}
            </Text>
          </View>
        </View>
        {ConnectableImage}
      </View>
    )
  }
}

SearchResultConnectableItem.propTypes = {
  connectable: PropTypes.any.isRequired,
}
