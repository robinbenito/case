import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    padding: 15,
    marginBottom: 20,
    width: (width / 2) - 30,
    height: (width / 2) - 30,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: (width / 2) - 30,
    height: (width / 2) - 30,
    alignSelf: 'center',
  },
  channelTitle: {
    fontSize: 12,
    color: '#000',
  },
})

export default class BlockItem extends Component {
  constructor(props) {
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
  }
  onPressButton() {
    // this.props.navigator.push(Router.getRoute('block', { id: this.props.block.id }));
    return this
  }

  render() {
    let blockInner

    switch (this.props.block.kind.type) {
      case 'Link':
      case 'Image':
        blockInner = (
          <Image style={styles.image} source={{ uri: this.props.block.kind.image_url }} />
        )
        break
      case 'Text':
        blockInner = (
          <Text style={styles.channelTitle} numberOfLines={9}>
            {this.props.block.kind.content}
          </Text>
        )
        break

      default:
        blockInner = (
          <Text style={styles.channelTitle}>
            {this.props.block.title}
          </Text>
        )
        break
    }

    return (
      <TouchableOpacity onPress={this.onPressButton} style={styles.container}>
        <View style={{ flex: 1 }}>{blockInner}</View>
      </TouchableOpacity>
    )
  }
}

BlockItem.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.string,
    kind: PropTypes.string,
  }).isRequired,
}
