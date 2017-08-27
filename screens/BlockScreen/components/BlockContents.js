import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'

import BlockMetadata from './BlockMetadata'
import BlockTabs from './BlockTabs'
import BlockActionTabs from './BlockActionTabs'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'
import HTMLStyles from '../../../constants/HtmlView'

const { width, height } = Dimensions.get('window')
const contentLength = width - (layout.padding * 2)
const contentTopMargin = ((height - contentLength) / 2) - layout.topbar

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: layout.padding * 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
  textContainer: {
    padding: layout.padding,
  },
  image: {
    width: contentLength - 2,
    height: contentLength - 2,
    resizeMode: 'contain',
  },
  innerContainer: {
    marginTop: contentTopMargin,
    marginBottom: layout.padding * 2,
    alignItems: 'center',
    flex: 1,
  },
  blockContainer: {
    width: contentLength,
    height: contentLength,
    borderWidth: 1,
    borderColor: colors.gray.border,
    alignItems: 'center',
  },
})

class BlockContainer extends React.Component {
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
    if (this.props.data.error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Block not found
          </Text>
        </View>
      )
    }

    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }

    const { block } = this.props.data
    const { __typename } = block.kind

    let blockInner

    switch (__typename) {
      case 'Attachment':
      case 'Embed':
      case 'Link':
      case 'Image':
        blockInner = (
          <TouchableOpacity onPress={() => this.openBrowser(block.source.url)}>
            <Image
              style={styles.image}
              source={{ uri: block.kind.image_url }}
            />
          </TouchableOpacity>
        )
        break

      case 'Text':
        blockInner = (
          <View style={styles.textContainer}>
            <HTMLView
              value={block.kind.content}
              stylesheet={HTMLStyles}
              addLineBreaks={null}
            />
          </View>
        )
        break

      default:
        blockInner = (
          <Text>
            {block.title}
          </Text>
        )
        break
    }

    const refreshing = this.props.data.networkStatus === 2 || this.props.data.networkStatus === 1
    const { refetched } = this.state

    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.refresh}
            />
          }
        >
          <View style={styles.innerContainer}>
            <View style={styles.blockContainer}>
              {blockInner}
            </View>
            <BlockMetadata block={block} />
          </View>
          <BlockTabs block={block} key={refetched} />
        </ScrollView>
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
      description
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
        type: __typename
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

BlockContainer.propTypes = {
  data: PropTypes.any.isRequired,
}

const ChannelContainerWithData = graphql(BlockQuery)(BlockContainer)

export default ChannelContainerWithData
