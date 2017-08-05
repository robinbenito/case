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
    paddingHorizontal: layout.padding,
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
      type: props.type,
    }
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
  }

  onEndReached() {
    if (this.props.blocksData.loading) return false
    const page = this.state.page + 1
    this.setState({ page })
    return this.props.loadMore(page)
  }

  onRefresh() {
    this.setState({
      page: 1,
    })
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  onToggleChange(value) {
    const type = {
      Channels: 'CHANNEL',
      Blocks: 'BLOCK',
    }[value]
    this.setState({ page: 1, type }, () => {
      this.props.blocksData.refetch({ page: 1, type })
    })
  }

  renderLoader() {
    if (!this.props.blocksData.loading) return null
    return (
      <ActivityIndicator animating size="small" style={styles.footer} />
    )
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

    const { type } = this.state
    const columnCount = type === 'CHANNEL' ? 1 : 2
    const columnStyle = columnCount > 1 ? { justifyContent: 'space-around' } : false
    const contents = (
      blocksData.networkStatus !== 2 &&
      blocksData &&
      blocksData.channel &&
      blocksData.channel.blocks
    ) || []

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={contents}
        columnWrapperStyle={columnStyle}
        refreshing={data.networkStatus === 4}
        numColumns={columnCount}
        keyExtractor={item => item.klass + item.id}
        key={type}
        onRefresh={() => data.refetch()}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
        ListHeaderComponent={() => (
          <ChannelHeader
            channel={channel}
            onToggle={this.onToggleChange}
            type={type}
          />
        )}
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
      visibility
    }
  }
`

const ChannelBlocksQuery = gql`
  query ChannelBlocksQuery($id: ID!, $page: Int!, $type: ConnectableTypeEnum){
    channel(id: $id) {
      __typename
      id
      blocks(per: 10, page: $page, sort_by: POSITION, direction: DESC, type: $type) {
        ...BlockThumb
      }
    }
  }
  ${BlockItem.fragments.block}
`

ChannelContainer.propTypes = {
  data: PropTypes.any.isRequired,
  blocksData: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  loadMore: PropTypes.any.isRequired,
  page: PropTypes.number,
}

ChannelContainer.defaultProps = {
  page: 1,
}

const ChannelContainerWithData = compose(
  graphql(ChannelQuery),
  graphql(ChannelBlocksQuery, {
    name: 'blocksData',
    options: ({ id, page, type }) => ({
      variables: { id, page, type },
      notifyOnNetworkStatusChange: true,
    }),
    props: (props) => {
      const { blocksData } = props
      const { id, type } = blocksData.variables
      return {
        blocksData,
        loadMore(page) {
          return props.blocksData.fetchMore({
            variables: {
              id,
              page,
              type,
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
