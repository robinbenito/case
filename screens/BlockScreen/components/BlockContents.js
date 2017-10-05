import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'
import styled from 'styled-components/native'

import NavigationService from '../../../utilities/navigationService'

import BlockMetadata from './BlockMetadata'
import BlockTabs from './BlockTabs'
import BlockActionTabs from './BlockActionTabs'

import { BaseIcon } from '../../../components/UI/Icons'
import { CenteringPane } from '../../../components/UI/Layout'
import ScrollWithRefresh from '../../../components/ScrollWithRefresh'

import HTMLStyles from '../../../constants/HtmlView'

import { Colors, Units } from '../../../constants/Style'

const { width } = Dimensions.get('window')
const contentWidth = width - Units.base

const TextContainer = styled.View`
  flex: 1;
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
  overflow: hidden;
  position: relative;
`

const Container = styled.View`
  align-items: center;
  flex: 1;
`

const BlockContainer = styled.View`
  width: ${contentWidth};
  height: ${contentWidth};
  border-width: 1;
  border-color: ${Colors.gray.light};
  align-items: center;
`

const ExpandTextContainer = styled.TouchableHighlight`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  alignItems: center;
  backgroundColor: white;
`

const TextIcon = styled(BaseIcon)`
  font-size: 24;
`

const BlockImage = styled(Image)`
  width: ${contentWidth - 2};
  height: ${contentWidth - 2};
  resize-mode: contain;
`

// eslint-disable-next-line
const ExpandText = ({ block }) => (
  <ExpandTextContainer
    onPress={() => NavigationService.navigate('text', {
      block,
      title: block.title,
    })}
    underlayColor={Colors.semantic.background}
  >
    {/* TouchableHighlight needs a view for rendering */}
    <View>
      <TextIcon name="ios-more" />
    </View>
  </ExpandTextContainer >
)

class BlockContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
      refetched: null,
    }
    this.openBrowser = this.openBrowser.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  async openBrowser(url) {
    if (url) {
      const result = await WebBrowser.openBrowserAsync(url)
      this.setState({ result })
    }
  }

  refresh() {
    this.props.data.refetch().then(() => {
      this.setState({ refetched: new Date() })
    })
  }

  render() {
    const { block, error, loading } = this.props.data
    const { imageLocation } = this.props

    if (error) {
      return (
        <CenteringPane>
          <Text>
            Block not found
          </Text>
        </CenteringPane>
      )
    }

    if (loading) {
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
              value={block.kind.content}
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

    const refreshing = this.props.data.networkStatus === 2 || this.props.data.networkStatus === 1
    const { refetched } = this.state

    return (
      <View>
        <ScrollWithRefresh refreshing={refreshing} onRefresh={this.refresh}>
          <Container>
            <BlockContainer>
              {blockInner}
            </BlockContainer>
            <BlockMetadata block={block} />
          </Container>
          <BlockTabs block={block} key={refetched} />
        </ScrollWithRefresh>
        <BlockActionTabs block={block} />
      </View>
    )
  }
}

const BlockQuery = gql`
  query BlockQuery($id: ID!){
    block(id: $id) {
      __typename
      id
      title
      updated_at(relative: true)
      created_at(relative: true)
      description(format: HTML)
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
          content(format: HTML)
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
