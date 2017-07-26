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
  TouchableHighlight,
  View,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'

import layout from '../../../constants/Layout'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
  image: {
    width,
    height,
    resizeMode: 'contain',
  },
})

const textStyles = StyleSheet.create({
  p: {
    fontSize: 14,
    paddingHorizontal: layout.padding * 2,
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
          <TouchableHighlight onPress={() => this.openBrowser(block.source.url)}>
            <Image
              style={styles.image}
              source={{ uri: block.kind.image_url }}
            />
          </TouchableHighlight>
        )
        break

      case 'Text':
        blockInner = (
          <HTMLView
            numberOfLines={9}
            value={block.kind.content}
            stylesheet={textStyles}
          />
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
        {blockInner}
      </ScrollView>
    )
  }
}

const BlockQuery = gql`
  query BlockQuery($id: ID!){
    block(id: $id) {
      id
      title
      updated_at(relative: true)
      user {
        name
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
