import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'
import styled from 'styled-components/native'

import BlockMetadata from './BlockMetadata'
import BlockTabs from './BlockTabs'
import { BaseIcon } from '../../../components/UI/Icons'
import ScrollWithRefresh from '../../../components/ScrollWithRefresh'
import { HEADER_HEIGHT } from '../../../components/Header'

import pollForBlockAvailability from '../../../hocs/pollForBlockAvailability'
import withLoadingAndErrors from '../../../hocs/withLoadingAndErrors'

import HTMLStyles from '../../../constants/HtmlView'
import { Colors, Units } from '../../../constants/Style'

import navigationService from '../../../utilities/navigationService'

const CONTENT_HEIGHT = Units.window.height - HEADER_HEIGHT
const CONTENT_WIDTH = Units.window.width - Units.base

const BlockFill = styled.View`
  width: 100%;
  height: ${Units.window.height - HEADER_HEIGHT};
  justify-content: center;
  align-items: center;
`

const TopSpacer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${-HEADER_HEIGHT};
`

const BlockContainer = styled.View`
  width: ${CONTENT_WIDTH};
  height: ${CONTENT_WIDTH};
  border-width: 1;
  border-color: ${Colors.gray.light};
  align-self: center;
  justify-content: center;
`

const ScrollToMetadata = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
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
      refetched: null,
    }
  }

  openBrowser = async (url) => {
    if (url) {
      await WebBrowser.openBrowserAsync(url)
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
    const { data: { block }, imageLocation } = this.props

    const __typename = block.kind && block.kind.__typename
    const imageUrl = block.kind.image_url || imageLocation

    let blockInner

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
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

      default: // Processing or stalled
        blockInner = <ActivityIndicator />
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
        <BlockFill>
          <TopSpacer />

          <BlockContainer>
            {blockInner}
          </BlockContainer>

          <ScrollToMetadata onPress={this.scrollToMetadata}>
            <ArrowDown />
          </ScrollToMetadata>
        </BlockFill>

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
      state
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
  data: PropTypes.object.isRequired,
  imageLocation: PropTypes.any,
}

BlockContents.defaultProps = {
  imageLocation: null,
}

const DecoratedBlockContents = compose(
  withLoadingAndErrors,
  pollForBlockAvailability,
)(BlockContents)

const BlockContentsWithData = graphql(BlockQuery)(DecoratedBlockContents)

export default BlockContentsWithData
