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
import { decode } from 'he'

import BlockItemIcon from './BlockItemIcon'

import NavigatorService from '../utilities/navigationService'
import layout from '../constants/Layout'
import colors from '../constants/Colors'
import type from '../constants/Type'
import HTMLStyles, { smallStyles } from '../constants/HtmlView'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    marginBottom: layout.padding * 2,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
  },
  blockTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: layout.padding * 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blockTitle: {
    color: colors.gray.light,
    fontSize: type.sizes.small,
    alignItems: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
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
    overflow: 'hidden',
  },
})

export default class BlockItem extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    NavigatorService.navigate('block', { id: this.props.block.id })
  }

  render() {
    let blockInner

    const { __typename } = this.props.block.kind
    const { size, block, style } = this.props

    const blockWidth = size === '1-up' ? layout.feedBlock : (width / 2)
    const blockPadding = size === '1-up' ? 0 : layout.padding
    const blockMargin = size === '1-up' ? layout.padding : 0

    const blockSize = {
      width: blockWidth - blockPadding,
      height: blockWidth - blockPadding,
    }

    const htmlStyle = size === '1-up' ? HTMLStyles : smallStyles

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
        blockInner = (
          <Image
            cache="force-cache"
            style={[styles.image, blockSize]}
            source={{ uri: block.kind.image_url, cache: 'force-cache' }}
          />
        )
        break
      case 'Text':
        blockInner = (
          <HTMLView
            numberOfLines={9}
            value={block.kind.content}
            stylesheet={htmlStyle}
            addLineBreaks={null}
          />
        )
        break

      default:
        blockInner = (
          <Text >
            {block.title}
          </Text>
        )
        break
    }

    const additionalStyle = __typename === 'Text' ? styles.text : {}
    const blockTitle = block.title ? decode(block.title) : null

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={this.onPress}
        style={[styles.container, { marginRight: blockMargin }]}
      >
        <View style={[styles.innerContainer, blockSize, additionalStyle, style]}>
          {blockInner}
        </View>
        <View style={styles.blockTitleContainer}>
          <Text numberOfLines={1} style={styles.blockTitle}>
            {blockTitle}
          </Text>
          <BlockItemIcon block={block} />
        </View>
      </TouchableOpacity>
    )
  }
}

BlockItem.fragments = {
  block: gql`
    fragment BlockThumb on Connectable {
      __typename
      id
      title(truncate: 30)
      updated_at(relative: true)
      user {
        id
        name
      }
      klass
      kind {
        __typename
        ... on Block {
          is_processed
        }
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
          counts {
            connections
          }
        }
      }
    }
  `,
}

BlockItem.propTypes = {
  style: PropTypes.any,
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
  style: {},
}

