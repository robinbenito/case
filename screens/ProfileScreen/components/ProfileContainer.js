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

import ProfileHeader from './ProfileHeader'
import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'

import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: layout.padding / 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
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
  }

  onEndReached() {
    if (this.props.profileBlocksData.loading) return false
    const page = this.state.page + 1
    this.setState({ page })
    console.log('onendReached', this.props)
    // return this.props.loadMore(page)
  }

  onRefresh() {
    console.log('on refresh')
    this.setState({
      page: 1,
    })
    this.props.userData.refetch({ notifyOnNetworkStatusChange: true })
  }

  onToggleChange(value) {
    const type = {
      Channels: 'CHANNEL',
      Blocks: 'BLOCK',
    }[value]
    this.setState({ page: 1, type })
    this.props.profileBlocksData.refetch({ page: 1, type })
  }

  render() {
    const { profileBlocksData, userData } = this.props
    const { error, loading } = this.props.userData

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
    const columnCount = type === 'CHANNEL' ? 1 : 2
    const columnStyle = columnCount > 1 ? { justifyContent: 'space-around' } : false
    const contents = (
      profileBlocksData &&
      profileBlocksData.user &&
      profileBlocksData.user.contents
    ) || []

    console.log('userData.user', userData.user)

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={contents}
        columnWrapperStyle={columnStyle}
        refreshing={profileBlocksData.networkStatus === 4}
        numColumns={columnCount}
        keyExtractor={item => item.klass + item.id}
        key={type}
        onRefresh={() => profileBlocksData.refetch()}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListHeaderComponent={() => {
          if (userData.user) {
            return (
              <ProfileHeader
                user={userData.user}
                onToggle={this.onToggleChange}
                type={type}
              />
            )
          }
          return <View />
        }}
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

const ProfileQuery = gql`
  query ProfileQuery($id: ID!){
    user(id: $id) {
      id
      slug
      initials
      name
      avatar(size: LARGE)
      bio
      can {
        follow
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
  userData: PropTypes.any.isRequired,
  profileBlocksData: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  loadMore: PropTypes.any,
  page: PropTypes.number,
}

ProfileContainer.defaultProps = {
  page: 1,
  loadMore: () => null,
}

const ProfileContainerWithData = compose(
  graphql(ProfileQuery, { name: 'userData' }),
  graphql(ProfileContentsQuery, {
    name: 'profileBlocksData',
    options: ({ id, page, type }) => ({
      variables: { id, page, type },
      notifyOnNetworkStatusChange: true,
    }),
    props: (props) => {
      const { profileBlocksData } = props
      const { id, type } = profileBlocksData.variables
      return {
        profileBlocksData,
        loadMore(page) {
          return profileBlocksData.fetchMore({
            variables: {
              id,
              page,
              type,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult.user.contents.length) { return previousResult }
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

export default ProfileContainerWithData
