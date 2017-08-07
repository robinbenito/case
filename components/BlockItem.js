import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import HTMLView from 'react-native-htmlview'

import NavigatorService from '../utilities/navigationService'
import layout from '../constants/Layout'
import colors from '../constants/Colors'
import HTMLStyles from '../constants/HtmlView'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    padding: layout.padding,
    borderWidth: 1,
    borderColor: colors.gray.border,
  },
})

export default class BlockItem extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    NavigatorService.navigate('block', { id: this.props.block.id })
    return this
  }

  render() {
    let blockInner

    const { __typename } = this.props.block.kind
    const { size } = this.props

    const blockWidth = size === '1-up' ? width : (width / 2)
    const blockPadding = size === '1-up' ? layout.padding * 2 : layout.padding

    const blockSize = {
      width: blockWidth - blockPadding,
      height: blockWidth - blockPadding,
    }

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
        blockInner = (
          <Image
            style={[styles.image, blockSize]}
            source={{ uri: this.props.block.kind.image_url }}
          />
        )
        break
      case 'Text':
        blockInner = (
          <HTMLView
            numberOfLines={9}
            value={this.props.block.kind.content}
            stylesheet={HTMLStyles}
            addLineBreaks={null}
          />
        )
        break

      default:
        blockInner = (
          <Text >
            {this.props.block.title}
          </Text>
        )
        break
    }

    const additionalStyle = __typename === 'Text' ? styles.text : {}

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={this.onPress}
        style={[styles.container, blockSize, additionalStyle]}
      >
        <View style={{ flex: 1 }}>{blockInner}</View>
      </TouchableOpacity>
    )
  }
}

BlockItem.fragments = {
  block: gql`
    fragment BlockThumb on Connectable {
      __typename
      id
      title
      updated_at(relative: true)
      user {
        name
      }
      klass
      kind {
        __typename
        ... on Attachment {
          image_url(size: DISPLAY)
        }
        ... on Embed {
          image_url(size: DISPLAY)
          source_url
        }
        ... on Text {
          content(format: HTML)
        }
        ... on Image {
          image_url(size: DISPLAY)
        }
        ... on Link {
          image_url(size: DISPLAY)
        }
        ... on Channel {
          visibility
        }
      }
    }
  `,
}

BlockItem.propTypes = {
  size: PropTypes.oneOf(['2-up', '1-up']),
  block: PropTypes.shape({
    id: PropTypes.any,
    title: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.any,
    kind: PropTypes.any,
  }).isRequired,
}

BlockItem.defaultProps = {
  size: '2-up',
}

