import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator, FlatList } from 'react-native'

import { Units } from '../../../constants/Style'

import withErrors from '../../../hocs/withErrors'

import FeedContents from './FeedContents'
import { CenterColumn, CenteringPane } from '../../../components/UI/Layout'
import FeedGroupSentence from '../../../components/FeedGroupSentence'
import LoadingScreen from '../../../components/LoadingScreen'
import { GenericMessage } from '../../../components/UI/Alerts'
import { Strong } from '../../../components/UI/Texts'

import feedQuery from '../queries/feed'

import navigationService from '../../../utilities/navigationService'
import scrollSensorForHeader from '../../../utilities/scrollSensorForHeader'

const ItemContainer = styled.View`
  margin-bottom: ${Units.scale[4]};
`

const Footer = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

class FeedContainer extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.func.isRequired,
      me: PropTypes.object,
    }).isRequired,
    limit: PropTypes.number,
    loadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    limit: 20,
  }

  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
    }
  }

  componentDidMount() {
    scrollSensorForHeader.dispatch(true)
  }

  onEndReached = () => {
    const { data: { loading }, loadMore, limit } = this.props
    const { offset: prevOffset } = this.state

    if (loading) return false

    const offset = prevOffset + limit

    this.setState({ offset })

    return loadMore(offset)
  }

  onRefresh = () => {
    const { data: { refetch } } = this.props

    this.setState({ offset: 0 })

    return refetch({ notifyOnNetworkStatusChange: true })
  }

  keyExtractor = (group, index) =>
    `${group.key}-${index}`

  renderLoader = () => {
    const { data: { loading } } = this.props

    return (
      <Footer>
        {loading &&
          <ActivityIndicator animating size="small" />
        }
      </Footer>
    )
  }

  renderItem = ({ item, index }) => (
    <ItemContainer key={`${item.key}-${index}`}>
      <FeedGroupSentence group={item} />

      {item.items.length > 0 &&
        <FeedContents items={item.items} verb={item.verb} />
      }
    </ItemContainer>
  )

  render() {
    const { data: { loading, me } } = this.props

    if (loading && !me) {
      return <LoadingScreen />
    }

    const EmptyComponent = (
      <CenteringPane>
        <GenericMessage>
          You aren’t following anything yet.
        </GenericMessage>
        <GenericMessage>
          Go to <Strong onPress={() => navigationService.navigate('explore', { showHeadline: true })}>Explore</Strong> and see what other people on Are.na are up to.
        </GenericMessage>
      </CenteringPane>
    )

    if (me.feed.groups.length > 0) return EmptyComponent

    return (
      <FlatList
        style={{ flexGrow: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
        data={me.feed.groups}
        refreshing={loading}
        initialNumToRender={4}
        keyExtractor={this.keyExtractor}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
        ListEmptyComponent={EmptyComponent}
        renderItem={this.renderItem}
      />
    )
  }
}

const FeedContainerWithData = graphql(feedQuery, {
  options: ({ offset, limit }) => ({
    variables: { offset, limit },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data, data: { fetchMore } }) => ({
    data,
    loadMore(offset) {
      return fetchMore({
        variables: { offset },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.me.feed.groups.length) { return previousResult }

          const { __typename: meTypename, id } = previousResult.me
          const { __typename: feedTypename } = previousResult.me.feed

          return {
            me: {
              id,
              __typename: meTypename,
              feed: {
                __typename: feedTypename,
                groups: [...previousResult.me.feed.groups, ...fetchMoreResult.me.feed.groups],
              },
            },
          }
        },
      })
    },
  }),
})(withErrors(FeedContainer, { showRefresh: true }))

export default FeedContainerWithData
