import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Text } from 'react-native'
import { decode } from 'he'
import styled from 'styled-components/native'
import { propType } from 'graphql-anywhere'
import Image from 'react-native-image-progress'

import TruncatedHTML from '../TruncatedHTML'
import BlockItemIcon from '../BlockItemIcon'
import { TouchableHighlight } from '../UI/Layout'
import BlockModalMenu from '../BlockModalMenu'
import { openModal } from '../Modal'

import navigationService from '../../utilities/navigationService'

import { Border, Colors, Typography, Units } from '../../constants/Style'

import blockItemFragment from './fragments/blockItem'

export const BLOCK_METADATA_HEIGHT = Units.scale[4] + Units.base

export const BLOCK_SIZES = {
  '1-up': (Units.window.width - (Units.scale[4] * 2)),
  '2-up': ((Units.window.width / 2) - (Units.scale[1] * 3)),
}

const Container = styled(TouchableHighlight)`
  width: ${x => BLOCK_SIZES[x.size]};
  height: ${x => BLOCK_SIZES[x.size] + BLOCK_METADATA_HEIGHT};
`

const Outline = styled.View`
  width: 100%;
  height: ${x => BLOCK_SIZES[x.size]};
  border-width: ${x => (x.hasImage && x.size === '2-up' ? 0 : Border.borderWidth)};
  border-color: ${Border.borderColor};
  overflow: hidden;
`

const Thumbnail = styled(Image).attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
`

const Metadata = styled.View`
  height: ${BLOCK_METADATA_HEIGHT};
  padding-top: ${Units.scale[2]};
`

const MetadataTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  color: ${Colors.gray.semiBold};
  font-size: ${x => Typography.fontSize[x.size === '1-up' ? 'base' : 'small']};
  line-height: ${x => Typography.lineHeightFor(x.size === '1-up' ? 'base' : 'small')};
  max-width: 90%;
  flex-basis: auto;
  text-align: center;
`

const ProcessingIndicator = styled(ActivityIndicator)`
  height: 100%;
`

export default class BlockItem extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['2-up', '1-up']).isRequired,
    block: propType(blockItemFragment).isRequired,
    channel: propType(BlockModalMenu.fragments.channel),
  }

  static defaultProps = {
    size: '2-up',
    channel: null,
  }

  static fragment = blockItemFragment

  onPress = () => {
    navigationService.navigate('block', {
      id: this.props.block.id,
      title: this.props.block.title,
    })
  }

  onLongPress = () => {
    const { block, channel } = this.props

    openModal({
      children: <BlockModalMenu
        block={block}
        channel={channel}
      />,
    })
  }

  render() {
    const {
      size,
      block,
      block: {
        state,
        kind: {
          __typename,
        },
      },
      ...rest
    } = this.props

    const title = block.title ? decode(block.title) : null

    let inner

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
        inner = (
          <Thumbnail
            cache="force-cache"
            source={{
              uri: block.kind.image_url,
              cache: 'force-cache',
            }}
          />
        )
        break
      case 'Text':
        inner = (
          <TruncatedHTML
            size={size}
            value={block.kind.content}
            numberOfFadedLines={1}
            stylesheet={{
              p: {
                fontSize: Typography.fontSize.small,
                lineHeight: Typography.lineHeightFor('small'),
                color: 'black',
              },
            }}
          />
        )
        break

      default:
        inner = (
          <Text>
            {block.title}
          </Text>
        )
        break
    }

    if (state !== 'available' && state !== 'failed') {
      inner = <ProcessingIndicator />
    }

    return (
      <Container
        size={size}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        {...rest}
      >
        <Outline hasImage={!!block.kind.image_url} size={size}>
          {inner}
        </Outline>

        <Metadata size={size}>
          <MetadataTitle>
            {title &&
              <Title size={size} numberOfLines={1}>
                {title}
              </Title>
            }

            <BlockItemIcon type={__typename} />
          </MetadataTitle>
        </Metadata>
      </Container>
    )
  }
}
