import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose, withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ProfileHeader from './ProfileHeader'
import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'
import Empty from '../../../components/Empty'

import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: 700,
    paddingBottom: layout.topbar * 2,
  },
  channelItem: {
    marginHorizontal: layout.padding,
  },
  loadingContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
  footer: {
    paddingVertical: layout.padding * 2,
  },
})

class ProfileContainer extends React.Component {
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
    const { userBlocksData } = this.props
    if (!userBlocksData.user || !userBlocksData.user.contents) return false

    const { loading, user } = this.props.data
    const { user: { contents } } = userBlocksData
    const type = `${this.state.type.toLowerCase()}s`
    const total = user.counts[type]

    if (loading) return false
    if (contents.length >= total) return false

    const page = this.state.page + 1
    this.setState({ page })
    return this.props.loadMore(page)
  }

  onRefresh() {
    this.setState({
      page: 1,
    })
    this.props.data.refetch()
  }

  onToggleChange(value) {
    const type = {
      Channels: 'CHANNEL',
      Blocks: 'BLOCK',
    }[value]
    this.setState({ page: 1, type }, () => {
      this.props.userBlocksData.refetch({ page: 1, type })
    })
  }

  renderLoader() {
    if (!this.props.userBlocksData.loading) return null
    return (
      <ActivityIndicator animating size="small" style={styles.footer} />
    )
  }

  render() {
    const { userBlocksData, data } = this.props
    const { error, loading } = this.props.data

    if (error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Profile not found
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
    const contents = (
      userBlocksData.networkStatus !== 2 &&
      userBlocksData &&
      userBlocksData.user &&
      userBlocksData.user.contents
    ) || []

    const shouldShowChannel = type === 'CHANNEL'
    const columnCount = shouldShowChannel ? 1 : 2
    const columnStyle = columnCount > 1 ? { justifyContent: 'space-around' } : false

    const header = (
      <ProfileHeader
        user={data.user}
        onToggle={this.onToggleChange}
        type={type}
      />
    )

    const empty = (
      <Empty text={`No public ${type.toLowerCase()}s`} />
    )

    const contentsLoading = userBlocksData.networkStatus === 2 || userBlocksData.networkStatus === 1

    if (contents.length === 0 && !contentsLoading) {
      return (
        <View style={{ flex: 1 }}>
          {header}
          {empty}
        </View>
      )
    }

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.container}
        data={contents}
        columnWrapperStyle={columnStyle}
        refreshing={userBlocksData.networkStatus === 4}
        onRefresh={this.onRefresh}
        numColumns={columnCount}
        keyExtractor={(item, index) => `${item.klass}-${item.id}-${index}`}
        key={type}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
        ListHeaderComponent={header}
        renderItem={({ item }) => {
          if (item.klass === 'Block') {
            return <BlockItem block={item} size="2-up" />
          }
          return <ChannelItem channel={item} style={styles.channelItem} />
        }}
      />
    )
  }
}

const ProfileQuery = gql`
  query ProfileQuery($id: ID!){
    user(id: $id) {
      __typename
      id
      slug
      name
      initials
      avatar(size: LARGE)
      bio
      can {
        follow
      }
      counts {
        blocks
        channels
      }
    }
  }
`

const ProfileContentsQuery = gql`
  query ProfileContentsQuery($id: ID!, $page: Int!, $type: ConnectableTypeEnum){
    user(id: $id) {
      __typename
      id
      contents(per: 10, page: $page, sort_by: UPDATED_AT, direction: DESC, type: $type) {
        ...BlockThumb
      }
    }
  }
  ${BlockItem.fragments.block}
`

ProfileContainer.propTypes = {
  data: PropTypes.any.isRequired,
  userBlocksData: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  loadMore: PropTypes.any,
  page: PropTypes.number,
}

ProfileContainer.defaultProps = {
  page: 1,
  loadMore: () => null,
}

const ProfileContainerWithData = compose(
  graphql(ProfileQuery),
  graphql(ProfileContentsQuery, {
    name: 'userBlocksData',
    options: ({ id, page, type }) => ({
      variables: { id, page, type },
      notifyOnNetworkStatusChange: true,
    }),
    props: (props) => {
      const { userBlocksData } = props
      const { id, type } = userBlocksData.variables
      return {
        userBlocksData,
        loadMore(page) {
          return props.userBlocksData.fetchMore({
            variables: {
              id,
              page,
              type,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult.user.contents.length || !previousResult.user) {
                return previousResult
              }
              const { __typename } = previousResult.user
              const response = {
                user: {
                  __typename,
                  id,
                  contents: [...previousResult.user.contents, ...fetchMoreResult.user.contents],
                },
              }
              return response
            },
          })
        },
      }
    },
  }),
)(ProfileContainer)

export default withApollo(ProfileContainerWithData)
