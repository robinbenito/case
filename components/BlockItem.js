import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { decode } from 'he'
import styled from 'styled-components/native'
import BlockItemIcon from './BlockItemIcon'
import NavigatorService from '../utilities/navigationService'
import TruncatedHTML from './TruncatedHTML'
import { Border, Colors, Typography, Units } from '../constants/Style'

export const BLOCK_METADATA_HEIGHT = Units.scale[4]

export const BLOCK_SIZES = {
  '1-up': (Units.window.width - (Units.scale[4] * 2)),
  '2-up': ((Units.window.width / 2) - (Units.scale[1] * 3)),
}

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
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

const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`

const Metadata = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${BLOCK_METADATA_HEIGHT};
  padding-bottom: ${Units.scale[2]};
  flex: 1;
`

const Title = styled.Text`
  color: ${Colors.gray.semiBold};
  font-size: ${x => Typography.fontSize[x.size === '1-up' ? 'base' : 'small']};
  line-height: ${x => Typography.lineHeightFor(x.size === '1-up' ? 'base' : 'small')};
  max-width: 90%;
  flex-basis: auto;
  text-align: center;
`

export default class BlockItem extends Component {
  onPress = () => {
    NavigatorService.navigate('block', {
      id: this.props.block.id,
      title: this.props.block.title,
    })
  }

  render() {
    const { size, block, ...rest } = this.props
    const __typename = block.kind && block.kind.__typename

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

    const title = block.title ? decode(block.title) : null

    return (
      <Container
        size={size}
        onPress={this.onPress}
        {...rest}
      >
        <Outline hasImage={!!block.kind.image_url} size={size}>
          {inner}
        </Outline>

        <Metadata size={size}>
          {title &&
            <Title size={size} numberOfLines={1}>
              {title}
            </Title>
          }

          <BlockItemIcon type={__typename} />
        </Metadata>
      </Container>
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
      source {
        url
      }
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
          counts {
            contents
          }
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

