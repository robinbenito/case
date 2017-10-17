import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'
import styled from 'styled-components/native'

import navigationService from '../../../utilities/navigationService'
import BlockMetadata from './BlockMetadata'
import BlockTabs from './BlockTabs'
import { BaseIcon } from '../../../components/UI/Icons'
import { RelativeFill, CenteringPane } from '../../../components/UI/Layout'
import ScrollWithRefresh from '../../../components/ScrollWithRefresh'
import HTMLStyles from '../../../constants/HtmlView'
import { Colors, Units } from '../../../constants/Style'
import { HEADER_HEIGHT } from '../../../components/Header'

const CONTENT_HEIGHT = Units.window.height - HEADER_HEIGHT
const CONTENT_WIDTH = Units.window.width - Units.base

// TODO: Organize!
const ScrollToMetadata = styled.TouchableOpacity`
  width: 100%;
  padding-vertical: ${Units.base};
`

const ArrowDown = styled(BaseIcon).attrs({
  name: 'ios-arrow-down',
})`
  font-size: 30;
  align-self: center;
`

const BlockFold = styled.View`
  min-height: ${CONTENT_HEIGHT};
`

const TextContainer = styled.View`
  flex: 1;
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
  overflow: hidden;
  position: relative;
`

const BlockContainer = styled.View`
  width: ${CONTENT_WIDTH};
  height: ${CONTENT_WIDTH};
  border-width: 1;
  border-color: ${Colors.gray.light};
  align-self: center;
`

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

const BlockImage = styled(Image)`
  width: 100%;
  height: 100%;
  resize-mode: contain;
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

class BlockContents extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      result: '',
      refetched: null,
    }
  }

  openBrowser = async (url) => {
    if (url) {
      const result = await WebBrowser.openBrowserAsync(url)
      this.setState({ result })
    }
  }

  refresh = () => {
    this.props.data.refetch().then(() => {
      this.setState({ refetched: new Date() })
    })
  }

  scrollToMetadata = () => {
    this.BlockContents.ScrollView.scrollTo({
      y: CONTENT_HEIGHT,
    })
  }

  render() {
    const { error, loading } = this.props.data
    const { imageLocation } = this.props

    const block = this.props.data.block

    if (error) {
      return (
        <CenteringPane>
          <Text>
            Block not found
          </Text>
        </CenteringPane>
      )
    }

    if (loading && !block) {
      return (
        <CenteringPane>
          <ActivityIndicator />
        </CenteringPane>
      )
    }

    const { __typename } = block.kind
    const imageUrl = block.kind.image_url || imageLocation || 'https://s3.amazonaws.com/arena_assets/assets/brand/arena-app-icon.png'

    let blockInner

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
      case 'Block':
        blockInner = (
          <TouchableOpacity onPress={() => this.openBrowser(block.source.url)}>
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

      default:
        blockInner = (
          <Text>{block.title}</Text>
        )
        break
    }

    const refreshing = this.props.data.networkStatus === 2
    const { refetched } = this.state

    return (
      <ScrollWithRefresh
        refreshing={refreshing}
        onRefresh={this.refresh}
        ref={ref => this.BlockContents = ref}
      >
        <RelativeFill>
          <BlockContainer>
            {blockInner}
          </BlockContainer>

          <ScrollToMetadata onPress={this.scrollToMetadata}>
            <ArrowDown />
          </ScrollToMetadata>
        </RelativeFill>

        {block.counts &&
          <BlockFold ref={ref => this.BlockFold = ref}>
            <BlockMetadata block={block} />

            <BlockTabs block={block} key={refetched} />
          </BlockFold>
        }
      </ScrollWithRefresh>
    )
  }
}

export const BlockQuery = gql`
  query BlockQuery($id: ID!){
    block(id: $id) {
      __typename
      id
      title
      updated_at(relative: true)
      created_at(relative: true)
      displayDescription: description(format: HTML)
      description(format: MARKDOWN)
      user {
        __typename
        id
        name
        slug
      }
      klass
      source {
        url
      }
      counts {
        channels
        comments
      }
      kind {
        __typename
        ... on Block {
          is_processed
        }
        ... on Embed {
          image_url(size: ORIGINAL)
        }
        ... on Attachment {
          image_url(size: ORIGINAL)
        }
        ... on Text {
          displayContent: content(format: HTML)
          content(format: MARKDOWN)
        }
        ... on Image {
          image_url(size: ORIGINAL)
        }
        ... on Link {
          image_url(size: ORIGINAL)
        }
      }
    }
  }
`

BlockContents.propTypes = {
  data: PropTypes.any.isRequired,
  imageLocation: PropTypes.any,
}

BlockContents.defaultProps = {
  imageLocation: null,
}

const BlockContentsWithData = graphql(BlockQuery)(BlockContents)

export default BlockContentsWithData
