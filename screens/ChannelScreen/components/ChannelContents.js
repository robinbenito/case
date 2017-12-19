import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { graphql, compose } from 'react-apollo'
import { get } from 'lodash'

import ConnectionFooter from './ConnectionFooter'
import FlatListFooter from '../../../components/UI/Layout/FlatListFooter'
import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'

import scrollSensorForHeader from '../../../utilities/scrollSensorForHeader'
import { networkStatusesService } from '../../../utilities/networkStatusService'
import alertErrors from '../../../utilities/alertErrors'

import channelBlocksQuery from '../queries/channelBlocks'
import channelConnectionsQuery from '../queries/channelConnections'

import { Units } from '../../../constants/Style'

const TYPE_CONFIG = {
  CONNECTION: {
    columnWrapperStyle: false,
    numColumns: 1,
    ListFooterComponent: ConnectionFooter,
  },

  CHANNEL: {
    columnWrapperStyle: false,
    numColumns: 1,
    ListFooterComponent: FlatListFooter,
  },

  BLOCK: {
    columnWrapperStyle: { justifyContent: 'space-around' },
    numColumns: 2,
    ListFooterComponent: FlatListFooter,
  },
}

class ChannelContents extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['CHANNEL', 'BLOCK', 'CONNECTION']).isRequired,
    page: PropTypes.number.isRequired,
    header: PropTypes.node.isRequired,
    channel: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    channelData: PropTypes.object.isRequired,
    loadPage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: props.page,
    }
  }

  componentDidMount() {
    scrollSensorForHeader.dispatch(false)
  }

  componentWillReceiveProps(nextProps) {
    // Resets the page state when type updates
    if (nextProps.page !== this.state.page && nextProps.type !== this.props.type) {
      this.setState({ page: nextProps.page })
    }
  }

  onEndReached = () => {
    const { data: { loading }, loadPage } = this.props

    if (loading) return false

    const { type, data: { channel: { counts, contents } } } = this.props

    const total = counts[`${type.toLowerCase()}s`]
    if (contents.length >= total) return false

    const nextPage = this.state.page + 1
    this.setState({ page: nextPage })

    return loadPage(nextPage).catch(alertErrors)
  }

  onRefresh = () => {
    const { channelData, data } = this.props

    this.setState({ page: 1 })

    channelData.refetch()
    data.refetch()
  }

  onScroll = scrollSensorForHeader

  keyExtractor = ({ klass, id }, index) =>
    `${klass}-${id}-${index}`

  renderItem = ({ item, index }) => {
    if (this.props.type === 'BLOCK') {
      const { channel } = this.props

      const isEven = index % 2 === 0
      const isLeft = isEven
      const isRight = !isEven

      return (
        <BlockItem
          block={item}
          channel={channel}
          style={{
            // Ensures margins are even
            marginLeft: isLeft ? Units.scale[1] : 0,
            marginRight: isRight ? Units.scale[1] : 0,
          }}
        />
      )
    }

    return <ChannelItem channel={item} />
  }

  render() {
    const {
      type,
      header,
      channel,
      data,
      channelData,
    } = this.props

    const {
      numColumns,
      columnWrapperStyle,
      ListFooterComponent,
    } = TYPE_CONFIG[type]

    const key = type
    const contents = get(data, 'channel.contents', [])
    const networkStatus = networkStatusesService([
      channelData.networkStatus,
      data.networkStatus,
    ])

    return (
      <FlatList
        key={key}
        data={contents}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapperStyle}
        keyExtractor={this.keyExtractor}
        refreshing={networkStatus.is.refreshing}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        onScroll={this.onScroll}
        scrollEventThrottle={50}
        ListHeaderComponent={header}
        ListFooterComponent={
          <ListFooterComponent
            channel={channel}
            loading={data.loading}
          />
        }
        renderItem={this.renderItem}
      />
    )
  }
}

const props = ({ data, data: { fetchMore } }) => ({
  data,
  loadPage(page) {
    return fetchMore({
      variables: { page },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { channel: { contents: newContents } } = fetchMoreResult
        const { channel: { contents: previousContents } } = previousResult

        if (!newContents.length) return previousResult

        return {
          channel: {
            ...previousResult.channel,
            contents: [
              ...previousContents,
              ...newContents,
            ],
          },
        }
      },
    })
  },
})

export default compose(
  graphql(channelBlocksQuery, {
    props,
    skip: ({ type }) => type !== 'BLOCK',
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),

  graphql(channelBlocksQuery, {
    props,
    skip: ({ type }) => type !== 'CHANNEL',
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),

  graphql(channelConnectionsQuery, {
    props,
    skip: ({ type }) => type !== 'CONNECTION',
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
)(ChannelContents)
