import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator, FlatList, View } from 'react-native'

import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'
import { CenterColumn } from '../../../components/UI/Layout'

import withLoading from '../../../hocs/withLoading'
import withErrors from '../../../hocs/withErrors'

import scrollSensorForHeader from '../../../utilities/scrollSensorForHeader'

import { Units } from '../../../constants/Style'

const Submit = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

const StyledChannelItem = styled(ChannelItem)`
  margin-horizontal: ${Units.base};
`

class ExploreContainer extends React.Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    exploreBlocksData: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
    loadMore: PropTypes.func,
    page: PropTypes.number,
  }

  static defaultProps = {
    page: 1,
    loadMore: () => null,
    type: 'CHANNEL',
  }

  constructor(props) {
    super(props)

    this.state = {
      page: props.page,
      type: props.type,
    }
  }

  componentDidMount() {
    scrollSensorForHeader.dispatch(false)
  }

  onEndReached = () => {
    const { exploreBlocksData } = this.props
    if (!exploreBlocksData.explore) return false

    const { loading } = this.props.data

    if (loading) return false

    const page = this.state.page + 1
    this.setState({ page })
    return this.props.loadMore(page)
  }

  onRefresh = () => {
    this.setState({ page: 1 })
    this.props.data.refetch()
  }

  onScroll = scrollSensorForHeader

  onToggleChange = (type) => {
    this.setState({ page: 1, type }, () => {
      this.props.exploreBlocksData.refetch({ page: 1, type })
    })
  }

  renderLoader = () => {
    if (!this.props.exploreBlocksData.loading) return null

    return (
      <Submit>
        <ActivityIndicator animating size="small" />
      </Submit>
    )
  }

  render() {
    const { exploreBlocksData } = this.props

    const { type } = this.state
    const contents = (
      exploreBlocksData.networkStatus !== 2 &&
      exploreBlocksData &&
      exploreBlocksData.explore
    ) || []

    const shouldShowChannel = type === 'CHANNEL'
    const columnCount = shouldShowChannel ? 1 : 2
    const columnStyle = columnCount > 1 ? { justifyContent: 'space-around' } : false

    const contentsLoading = exploreBlocksData.networkStatus === 2 || exploreBlocksData.networkStatus === 1

    if (contents.length === 0 && !contentsLoading) {
      return (
        <View style={{ flex: 1 }}>
          
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={contents}
          columnWrapperStyle={columnStyle}
          refreshing={exploreBlocksData.networkStatus === 4}
          onRefresh={this.onRefresh}
          numColumns={columnCount}
          keyExtractor={(item, index) => `${item.klass}-${item.id}-${index}`}
          key={type}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.9}
          scrollEventThrottle={50}
          onScroll={this.onScroll}
          ListFooterComponent={this.renderLoader}
          renderItem={({ item }) => {
            if (item.klass === 'Block') {
              return <BlockItem block={item} size="2-up" />
            }
            return <StyledChannelItem channel={item} />
          }}
        />
      </View>
    )
  }
}

export const ExploreContentsQuery = gql`
  query ExploreContentsQuery($page: Int!, $type: SearchType) {
    explore(per: 10, page: $page, sort_by: UPDATED_AT, direction: DESC, type: $type) {
      __typename
      ...BlockThumb
    }
  }
  ${BlockItem.fragments.block}
`

const DecoratedExploreContainer = withLoading(withErrors(ExploreContainer, {
  errorMessage: 'Error getting feed',
  dataKeys: ['data', 'exploreBlocksData'],
  showRefresh: true,
}))

const ExploreContainerWithData = compose(
  graphql(ExploreContentsQuery, {
    name: 'exploreBlocksData',
    options: ({ id, page, type }) => ({
      variables: { id, page, type },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }),
    props: (props) => {
      const { exploreBlocksData } = props
      const { id, type } = exploreBlocksData.variables
      return {
        exploreBlocksData,
        loadMore(page) {
          return props.userBlocksData.fetchMore({
            variables: {
              id,
              page,
              type,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult.explore.length || !previousResult.explore) {
                return previousResult
              }
              const response = {
                explore: [...previousResult.explore, ...fetchMoreResult.explore],
              }
              return response
            },
          })
        },
      }
    },
  }),
)(DecoratedExploreContainer)

export default ExploreContainerWithData
