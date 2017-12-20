import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { WebBrowser } from 'expo'
import styled from 'styled-components/native'

import BlockMetadata from './BlockMetadata'
import BlockTabs from './BlockTabs'
import BlockInner from '../../../components/BlockInner'
import { BaseIcon } from '../../../components/UI/Icons'
import ScrollWithRefresh from '../../../components/ScrollWithRefresh'
import { HEADER_HEIGHT } from '../../../components/Header'

import pollForBlockAvailability from '../../../hocs/pollForBlockAvailability'
import withLoadingAndErrors from '../../../hocs/withLoadingAndErrors'

import { Units } from '../../../constants/Style'

const CONTENT_HEIGHT = Units.window.height - HEADER_HEIGHT

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

const ScrollToMetadata = styled.TouchableOpacity`
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

          <BlockInner
            block={block}
            imageLocation={imageLocation}
            onPress={() => this.openBrowser(block.source.url || block.kind.file_url)}
          />

          <ScrollToMetadata onPress={this.scrollToMetadata}>
            <ArrowDown />
          </ScrollToMetadata>
        </BlockFill>

        {block.kind.counts &&
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
      kind {
        __typename
        ... on Block {
          counts {
            channels
            comments
          }
        }
        ... on Embed {
          image_url(size: ORIGINAL)
        }
        ... on Attachment {
          image_url(size: ORIGINAL)
          file_url
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
      ...BlockMetadata
    }
  }
  ${BlockMetadata.fragment}
`

BlockContents.propTypes = {
  data: PropTypes.object.isRequired, // TODO
  imageLocation: PropTypes.string,
}

BlockContents.defaultProps = {
  imageLocation: null,
}

const DecoratedBlockContents = compose(
  withLoadingAndErrors,
  pollForBlockAvailability,
)(BlockContents)

const BlockContentsWithData = graphql(BlockQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(DecoratedBlockContents)

export default BlockContentsWithData
