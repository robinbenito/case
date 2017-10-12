import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native'

import ChannelHeader from './ChannelHeader'
import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'
import { CenterColumn, RelativeFill } from '../../../components/UI/Layout'
import { ButtonLabel, Button } from '../../../components/UI/Buttons'
import Empty from '../../../components/Empty'
import { Units } from '../../../constants/Style'

import NavigatorService from '../../../utilities/navigationService'
import scrollHeaderVisibilitySensor from '../../../utilities/scrollHeaderVisibilitySensor'

const Submit = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

class ChannelContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: props.page,
      type: props.type,
    }
  }

  componentDidMount() {
    scrollHeaderVisibilitySensor.dispatch(false)
  }

  onRefresh = () => {
    this.setState({ page: 1 })
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  onEndReached = () => {
    const { blocksData } = this.props
    if (!blocksData.channel || !blocksData.channel.blocks) return false

    const { loading, channel } = this.props.data
    const { channel: { blocks } } = this.props.blocksData
    const type = `${this.state.type.toLowerCase()}s`
    const total = channel.counts[type]

    if (loading) return false
    if (blocks.length >= total) return false
    const page = this.state.page + 1
    this.setState({ page })
    return this.props.loadMore(page)
  }

  onToggleChange = (type) => {
    this.setState({ page: 1, type }, () => {
      if (type !== 'CONNECTION') {
        this.props.blocksData.refetch({ page: 1, type })
      }
    })
  }

  navigateToConnect = () => {
    const { channel } = this.props.data
    NavigatorService.navigate('connect', {
      connectable_id: channel.id,
      connectable_type: 'CHANNEL',
      title: channel.title,
    })
  }

  renderFooter = () => {
    if (!this.props.blocksData.loading) return null

    return (
      <Submit>
        <ActivityIndicator animating size="small" />
      </Submit>
    )
  }

  render() {
    const { data, blocksData, connectionsData } = this.props
    const { error, loading, channel } = this.props.data
    const { type } = this.state

    if (error) {
      return (
        <RelativeFill>
          <Empty text="Channel not found" />
        </RelativeFill>
      )
    }

    if (loading) {
      return (
        <RelativeFill>
          <ActivityIndicator />
        </RelativeFill>
      )
    }

    const columnCount = type === 'CHANNEL' || type === 'CONNECTION' ? 1 : 2
    const columnStyle = columnCount > 1 ? { justifyContent: 'space-around' } : false

    const contentsData = type === 'CONNECTION' ? connectionsData : blocksData
    const contentsKey = type === 'CONNECTION' ? 'connections' : 'blocks'

    const contents = (
      contentsData.networkStatus !== 2 &&
      contentsData &&
      contentsData.channel &&
      contentsData.channel[contentsKey]
    ) || []

    const header = (
      <ChannelHeader
        channel={channel}
        onToggle={this.onToggleChange}
        type={type}
      />
    )
    const empty = (
      <Empty text={`No connected ${type.toLowerCase()}s`} />
    )

    const contentsLoading = contentsData.networkStatus === 2 || contentsData.networkStatus === 1

    if (contents.length === 0 && !contentsLoading && type !== 'CONNECTION') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {header}
          {empty}
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={contents}
          columnWrapperStyle={columnStyle}
          refreshing={data.networkStatus === 4}
          numColumns={columnCount}
          keyExtractor={(item, index) => `${item.klass}-${item.id}-${index}`}
          key={type}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.9}
          scrollEventThrottle={50}
          onScroll={scrollHeaderVisibilitySensor}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={header}
          renderItem={({ item, index }) => {
            const isEven = index % 2 === 0
            const isLeft = isEven
            const isRight = !isEven

            if (item.klass === 'Block') {
              return (
                <BlockItem
                  block={item}
                  style={{
                    // Ensures margins are even
                    marginLeft: isLeft ? Units.scale[1] : 0,
                    marginRight: isRight ? Units.scale[1] : 0,
                  }}
                />
              )
            }

            return <ChannelItem channel={item} />
          }}
        />
        {type === 'CONNECTION' &&
          <Submit>
            <Button space={1} onPress={this.navigateToConnect}>
              <ButtonLabel>Connect &rarr;</ButtonLabel>
            </Button>
          </Submit>
        }
      </View>
    )
  }
}

export const ChannelQuery = gql`
  query ChannelQuery($id: ID!){
    channel(id: $id) {
      __typename
      id
      slug
      title
      displayDescription: description(format: HTML)
      description(format: MARKDOWN)
      visibility
      can {
        follow
        manage
      }
      user {
        id
        name
        slug
      }
      visibility
      counts {
        blocks
        channels
        connections
      }
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

export const ChannelConnectionsQuery = gql`
  query ChannelBlocksQuery($id: ID!){
    channel(id: $id) {
      __typename
      id
      connections {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

ChannelContainer.propTypes = {
  data: PropTypes.any.isRequired,
  blocksData: PropTypes.any.isRequired,
  connectionsData: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  loadMore: PropTypes.any.isRequired,
  page: PropTypes.number,
}

ChannelContainer.defaultProps = {
  page: 1,
}

const ChannelContainerWithData = compose(
  graphql(ChannelQuery),
  graphql(ChannelConnectionsQuery, { name: 'connectionsData' }),
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
