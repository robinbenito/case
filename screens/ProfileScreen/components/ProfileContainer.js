import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { FlatList, View } from 'react-native'

import ProfileHeader from './ProfileHeader'
import ProfileActions from './ProfileActions'
import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'
import UserAvatar from '../../../components/UserAvatar'
import Empty from '../../../components/Empty'
import { CenterColumn } from '../../../components/UI/Layout'
import FlatListFooter from '../../../components/UI/Layout/FlatListFooter'
import { ButtonLabel, Button } from '../../../components/UI/Buttons'

import withLoading from '../../../hocs/withLoading'
import withErrors from '../../../hocs/withErrors'

import CurrentUser from '../../../utilities/currentUserService'
import navigationService from '../../../utilities/navigationService'
import scrollSensorForHeader from '../../../utilities/scrollSensorForHeader'

import { Units } from '../../../constants/Style'

const Submit = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

const StyledChannelItem = styled(ChannelItem)`
  margin-horizontal: ${Units.base};
`

class ProfileContainer extends React.Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    userBlocksData: PropTypes.any.isRequired,
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

  onRefresh = () => {
    this.setState({ page: 1 })
    this.props.data.refetch()
  }

  onScroll = scrollSensorForHeader

  onToggleChange = (type) => {
    this.setState({ page: 1, type }, () => {
      this.props.userBlocksData.refetch({ page: 1, type })
    })
  }

  render() {
    const { userBlocksData, data } = this.props

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

    const currentUser = CurrentUser.sync.get()
    const isTheCurrentUser = currentUser && currentUser.id === data.user.id

    const header = (
      <ProfileHeader
        user={data.user}
        onToggle={this.onToggleChange}
        type={type}
        isTheCurrentUser={isTheCurrentUser}
      />
    )

    const contentsLoading = userBlocksData.networkStatus === 2 || userBlocksData.networkStatus === 1

    if (contents.length === 0 && !contentsLoading) {
      const emptyComponent = isTheCurrentUser ? (
        <Empty>
          <Submit>
            <Button space={1} onPress={() => navigationService.navigate('newChannel')}>
              <ButtonLabel>New Channel</ButtonLabel>
            </Button>
          </Submit>
        </Empty>
      ) : (<Empty text="Nothing here yet" />)

      return (
        <View style={{ flex: 1 }}>
          {header}
          {emptyComponent}
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={contents}
          columnWrapperStyle={columnStyle}
          refreshing={userBlocksData.networkStatus === 4}
          onRefresh={this.onRefresh}
          numColumns={columnCount}
          keyExtractor={(item, index) => `${item.klass}-${item.id}-${index}`}
          key={type}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.9}
          scrollEventThrottle={50}
          onScroll={this.onScroll}
          ListFooterComponent={<FlatListFooter loading={userBlocksData.loading} />}
          ListHeaderComponent={header}
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

const ProfileQuery = gql`
  query ProfileQuery($id: ID!){
    user(id: $id) {
      __typename
      id
      slug
      name
      bio(format: HTML)
      can {
        follow
      }
      counts {
        blocks
        channels
      }
      ...Avatar
      ...ProfileActions
    }
  }
  ${UserAvatar.fragments.avatar}
  ${ProfileActions.fragment}
`

export const ProfileContentsQuery = gql`
  query ProfileContentsQuery($id: ID!, $page: Int!, $type: ConnectableTypeEnum) {
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

const DecoratedProfileContainer = withLoading(withErrors(ProfileContainer, {
  errorMessage: 'Error getting profile',
  dataKeys: ['data', 'userBlocksData'],
  showRefresh: true,
}))

const ProfileContainerWithData = compose(
  graphql(ProfileQuery, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
  graphql(ProfileContentsQuery, {
    name: 'userBlocksData',
    options: ({ id, page, type }) => ({
      variables: { id, page, type },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
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
)(DecoratedProfileContainer)

export default ProfileContainerWithData
