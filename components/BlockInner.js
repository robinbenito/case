import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import Image from 'react-native-image-progress'
import HTMLView from 'react-native-htmlview'

import { ActivityIndicator, TouchableOpacity, View } from 'react-native'

import { Colors, Units } from '../constants/Style'
import HTMLStyles from '../constants/HtmlView'
import { BaseIcon } from '../components/UI/Icons'

import navigationService from '../utilities/navigationService'

const ExpandTextContainer = styled.TouchableHighlight`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  align-items: center;
`
const TextIcon = styled(BaseIcon)`
  font-size: 24;
`

const BlockImage = styled(Image).attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
`

const TextContainer = styled.View`
  flex: 1;
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
  overflow: hidden;
  position: relative;
`

const ExpandText = ({ block }) => (
  <ExpandTextContainer
    onPress={() => navigationService.navigate('text', {
      block,
      title: block.title,
    })}
    underlayColor={Colors.semantic.background}
  >
    {/* TouchableHighlight needs a view for rendering */}
    <View>
      <TextIcon name="ios-more" />
    </View>
  </ExpandTextContainer>
)

ExpandText.propTypes = {
  block: PropTypes.any.isRequired,
}

export default class BlockInner extends React.Component {
  render() {
    const { block, imageLocation, onPress } = this.props

    const imageUrl = block.kind.image_url || imageLocation
    const __typename = block.kind && block.kind.__typename

    let blockInner

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
        blockInner = (
          <TouchableOpacity onPress={onPress}>
            <BlockImage
              source={{ uri: imageUrl, cache: 'force-cache' }}
            />
          </TouchableOpacity>
        )
        break

      case 'Text':
        blockInner = (
          <TextContainer>
            <HTMLView
              value={block.kind.displayContent}
              stylesheet={HTMLStyles}
            />
            <ExpandText block={block} />
          </TextContainer>
        )
        break

      default: // Processing or stalled
        blockInner = <ActivityIndicator />
        break
    }
    return blockInner
  }
}

BlockInner.propTypes = {
  block: PropTypes.any.isRequired,
  imageLocation: PropTypes.any,
  onPress: PropTypes.func,
}

BlockInner.defaultProps = {
  imageLocation: null,
  onPress: () => null,
}
