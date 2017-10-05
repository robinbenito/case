import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator, FlatList } from 'react-native'

import FeedContents from './FeedContents'
import { CenterColumn } from '../../../components/UI/Layout'
import FeedWordLink from '../../../components/FeedWordLink'
import FeedGroupSentence from '../../../components/FeedGroupSentence'
import BlockItem from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import Empty from '../../../components/Empty'
import UserAvatar from '../../../components/UserAvatar'

import { Units } from '../../../constants/Style'

const ItemContainer = styled.View`
  margin-bottom: ${Units.scale[4]};
`

const Footer = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

class FeedContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
    }
    this.onEndReached = this.onEndReached.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached() {
    if (this.props.data.loading) return false
    const offset = this.state.offset + this.props.limit
    this.setState({ offset })
    return this.props.loadMore(offset)
  }

  onRefresh() {
    this.setState({
      offset: 0,
    })
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  renderLoader() {
    if (!this.props.data.loading) return <Footer />
    return (
      <Footer>
        <ActivityIndicator animating size="small" />
      </Footer>
    )
  }

  render() {
    if (this.props.data.error) {
      return (
        <Empty text="Error fetching feed" />
      )
    }

    if (this.props.data.loading && !this.props.data.me) {
      return (
        <Empty>
          <ActivityIndicator />
        </Empty>
      )
    }

    const { data } = this.props
    const emptyComponent = (<Empty text="This is your feed" />)

    if (data.me.feed.groups.length === 0) {
      return emptyComponent
    }

    return (
      <FlatList
        style={{ flexGrow: 1, backgroundColor: '#fff' }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}
        data={data.me.feed.groups}
        refreshing={data.loading}
        initialNumToRender={4}
        keyExtractor={(group, index) => `${group.key}-${index}`}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
        ListEmptyComponent={emptyComponent}
        renderItem={({ item, index }) => (
          <ItemContainer key={`${item.key}-${index}`}>
            <FeedGroupSentence group={item} />
            {item.items.length > 0 && <FeedContents items={item.items} verb={item.verb} />}
          </ItemContainer>
          )}
      />
    )
  }
}

const FeedQuery = gql`
  query FeedQuery($offset: Int, $limit: Int){
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit) {
        __typename
        groups {
          __typename
          id: key
          key
          length
          user {
            id
            name
            slug
          }
          is_single
          verb
          object {
            __typename
            ...ChannelWord
            ...ConnectableWord
            ...UserWord
          }
          object_phrase
          connector
          target {
            __typename
            ...ChannelWord
            ...ConnectableWord
            ...UserWord
          }
          target_phrase
          created_at(relative: true)
          items {
            __typename
            ...Avatar
            ...ChannelThumb
            ...BlockThumb
          }
        }
      }
    }
  }
  ${UserAvatar.fragments.avatar}
  ${BlockItem.fragments.block}
  ${ChannelItem.fragments.channel}
  ${FeedWordLink.fragments.channel}
  ${FeedWordLink.fragments.connectable}
  ${FeedWordLink.fragments.user}
`

FeedContainer.propTypes = {
  data: PropTypes.any.isRequired,
  limit: PropTypes.number,
  loadMore: PropTypes.any.isRequired,
}

FeedContainer.defaultProps = {
  limit: 20,
}

const FeedContainerWithData = graphql(FeedQuery, {
  options: ({ offset, limit }) => ({
    variables: { offset, limit },
    notifyOnNetworkStatusChange: true,
  }),
  props: (props) => {
    const { data } = props
    return {
      data,
      loadMore(offset) {
        return props.data.fetchMore({
          variables: {
            offset,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.me.feed.groups.length) { return previousResult }
            const { __typename: meTypename, id } = previousResult.me
            const { __typename: feedTypename } = previousResult.me.feed
            const response = {
              me: {
                id,
                __typename: meTypename,
                feed: {
                  __typename: feedTypename,
                  groups: [...previousResult.me.feed.groups, ...fetchMoreResult.me.feed.groups],
                },
              },
            }
            return response
          },
        })
      },
    }
  },
})(FeedContainer)

export default FeedContainerWithData
