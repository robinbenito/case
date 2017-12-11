import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator, FlatList, View } from 'react-native'

import ExploreHeader from './ExploreHeader'

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

const TYPE_CONFIG = {
  CHANNEL: {
    columnWrapperStyle: false,
    numColumns: 1,
  },

  CONNECTABLE: {
    columnWrapperStyle: { justifyContent: 'space-around' },
    numColumns: 2,
  },
}

class ExploreContainer extends React.Component {
  static propTypes = {
    exploreBlocksData: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['CHANNEL', 'CONNECTABLE']).isRequired,
    loadMore: PropTypes.func,
    page: PropTypes.number,
    showHeadline: PropTypes.bool.isRequired,
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
    scrollSensorForHeader.dispatch(true)
  }

  onEndReached = () => {
    const { exploreBlocksData } = this.props
    if (!exploreBlocksData.explore) return false

    const { loading } = this.props.exploreBlocksData

    if (loading) return false

    const page = this.state.page + 1
    this.setState({ page })
    return this.props.loadMore(page)
  }

  onRefresh = () => {
    this.setState({ page: 1 })
    this.props.exploreBlocksData.refetch()
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
    const { exploreBlocksData, showHeadline } = this.props

    const { type } = this.state
    const contents = (
      exploreBlocksData &&
      exploreBlocksData.explore
    ) || []

    const {
      numColumns,
      columnWrapperStyle,
    } = TYPE_CONFIG[type]

    const header = (
      <ExploreHeader
        onToggle={this.onToggleChange}
        type={type}
        showHeadline={showHeadline}
      />
    )

    return (
      <View>
        <FlatList
          data={contents}
          columnWrapperStyle={columnWrapperStyle}
          refreshing={exploreBlocksData.networkStatus === 4}
          onRefresh={this.onRefresh}
          numColumns={numColumns}
          keyExtractor={(item, index) => `${item.klass}-${item.id}-${index}`}
          key={type}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.9}
          scrollEventThrottle={50}
          onScroll={this.onScroll}
          ListHeaderComponent={header}
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
      ... on Channel {
        ...ChannelThumb
      }
      ... on Connectable {
        ...BlockThumb
      }
    }
  }
  ${BlockItem.fragments.block}
  ${ChannelItem.fragments.channel}
`

const DecoratedExploreContainer = withLoading(withErrors(ExploreContainer, {
  errorMessage: 'Error getting explore',
  dataKeys: ['data', 'exploreBlocksData'],
}))

const ExploreContainerWithData = compose(
  graphql(ExploreContentsQuery, {
    name: 'exploreBlocksData',
    options: ({ id, page, type }) => ({
      variables: { id, page, type },
      fetchPolicy: 'cache-and-network',
    }),
    props: (props) => {
      const { exploreBlocksData } = props
      const { id, type } = exploreBlocksData.variables
      return {
        exploreBlocksData,
        loadMore(page) {
          return props.exploreBlocksData.fetchMore({
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
