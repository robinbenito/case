import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ChannelHeader from './ChannelHeader'
import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'

import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: 700,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
})

class ChannelContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: props.page,
    }
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached() {
    if (this.props.data.loading) return false
    const page = this.state.page + 1
    this.setState({ page })
    return this.props.loadMore(page)
  }

  onRefresh() {
    this.setState({
      offset: 0,
    })
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  render() {
    const { data, blocksData } = this.props
    const { error, loading, channel } = this.props.data

    if (error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Channel not found
          </Text>
        </View>
      )
    }

    if (loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }

    const columnCount = this.props.type === 'Channels' ? 1 : 2
    const columnStyle = columnCount > 1 ? { justifyContent: 'space-around' } : false

    const contents = (blocksData && blocksData.channel && blocksData.channel.blocks) || []

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={contents}
        columnWrapperStyle={columnStyle}
        refreshing={data.networkStatus === 4}
        numColumns={columnCount}
        keyExtractor={item => item.klass + item.id}
        key={this.props.type}
        onRefresh={() => data.refetch()}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListHeaderComponent={() => <ChannelHeader channel={channel} />}
        renderItem={({ item }) => {
          if (item.klass === 'Block') {
            return <BlockItem block={item} />
          }
          return <ChannelItem channel={item} />
        }}
      />
    )
  }
}

const ChannelQuery = gql`
  query ChannelQuery($id: ID!){
    channel(id: $id) {
      __typename
      id
      slug
      title
      visibility
      can {
        follow
      }
      user {
        name
        slug
      }
      counts {
        blocks
      }
      collaborators {
        name
        slug
      }
      visibility
    }
  }
`

const ChannelBlocksQuery = gql`
  query ChannelBlocksQuery($id: ID!, $page: Int!){
    channel(id: $id) {
      __typename
      id
      blocks(per: 10, page: $page, sort_by: POSITION, direction: DESC, type: BLOCK) {
        __typename
        id
        title
        updated_at(relative: true)
        user {
          name
        }
        klass
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
          }
        }
      }
    }
  }
`

ChannelContainer.propTypes = {
  data: PropTypes.any.isRequired,
  blocksData: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['Channels', 'Blocks']),
  loadMore: PropTypes.any.isRequired,
  page: PropTypes.number,
}

ChannelContainer.defaultProps = {
  type: 'Blocks',
  page: 1,
}

const ChannelContainerWithData = compose(
  graphql(ChannelQuery),
  graphql(ChannelBlocksQuery, {
    name: 'blocksData',
    options: ({ id, page }) => ({
      variables: { id, page },
      notifyOnNetworkStatusChange: true,
    }),
    props: (props) => {
      const { blocksData } = props
      const { id } = blocksData.variables
      return {
        blocksData,
        loadMore(page) {
          return props.blocksData.fetchMore({
            variables: {
              id,
              page,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult.channel.blocks.length) { return previousResult }
              const { __typename } = previousResult.channel
              const response = {
                channel: {
                  __typename,
                  id,
                  blocks: [...previousResult.channel.blocks, ...fetchMoreResult.channel.blocks],
                },
              }
              return response
            },
          })
        },
      }
    },
  }),
)(ChannelContainer)

export default ChannelContainerWithData
