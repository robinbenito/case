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
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'

import BlockMetadata from './BlockMetadata'
import BlockTabs from './BlockTabs'

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
    }
    this.openBrowser = this.openBrowser.bind(this)
  }

  async openBrowser(url) {
    if (url) {
      const result = await WebBrowser.openBrowserAsync(url)
      this.setState({ result })
    }
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

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.blockContainer}>
            {blockInner}
          </View>
          <BlockMetadata block={block} />
        </View>
        <BlockTabs block={block} />
      </ScrollView>
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
