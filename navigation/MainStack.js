import React from 'react'
import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'
import { connect } from 'react-redux'

import BlockScreen from '../screens/BlockScreen'
import BlockTextScreen from '../screens/BlockScreen/components/BlockText' // TODO: Move this to screens
import ChannelScreen from '../screens/ChannelScreen'
import CommentScreen from '../screens/CommentScreen'
import FeedScreen from '../screens/FeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'
import EditChannelScreen from '../screens/EditChannelScreen'
import EditBlockScreen from '../screens/EditBlockScreen'
import NewChannelScreen from '../screens/NewChannelScreen'
import ChannelVisibility from '../components/ChannelVisibility' // TODO: Move this to screens
import EditAccountNameScreen from '../screens/EditAccountScreens/EditAccountNameScreen'
import EditEmailNotificationsScreen from '../screens/EditAccountScreens/EditEmailNotificationsScreen'

import Header from '../components/Header'
import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'
import BlockEditButton from '../components/BlockEditButton'
import BackButton from '../components/BackButton'

import headerNavigationOptions from '../constants/Header'

const HeaderWithState = connect(({ ui: { isHeaderTitleVisible } }) => ({
  isHeaderTitleVisible,
}))(Header)

export default enhance(StackNavigator)({
  feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: 'Feed' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
        ]}
        headerLeft={null}
        headerRight={<HeaderIcon navigation={navigation} />}
      />,
    }),
  },

  block: {
    screen: BlockScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: 'Block' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
        headerRight={<BlockEditButton id={navigation.state.params.id} />}
      />,
    }),
  },

  text: { // TODO: Rename to `blockText` or like 'blockExpandedText'...
    screen: BlockTextScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: null }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
      />,
    }),
  },

  comment: {
    screen: CommentScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      ...headerNavigationOptions,
    }),
  },

  channel: {
    screen: ChannelScreen,
    navigationOptions: ({ navigation }) => ({
      header: <HeaderWithState
        navigation={navigation}
        primary={{ title: 'Channel' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
        isHeaderTitleVisible={false}
      />,
    }),
  },

  profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      const notMyProfile = navigation.state.params && navigation.state.params.id
      const headerLeft = notMyProfile ? <BackButton /> : null
      return {
        header: <HeaderWithState
          navigation={navigation}
          primary={{ title: 'Profile' }}
          headerLeft={headerLeft}
          secondary={[
            { title: 'Feed', key: 'feed' },
          ]}
          isHeaderTitleVisible={false}
        />,
      }
    },
  },

  userSettings: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: 'Settings' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
      />,
    }),
  },

  editAccountName: {
    screen: EditAccountNameScreen,
    navigationOptions: {
      title: 'Name',
      ...headerNavigationOptions,
    },
  },

  editEmailNotifications: {
    screen: EditEmailNotificationsScreen,
    navigationOptions: {
      title: 'Name',
      ...headerNavigationOptions,
    },
  },

  editChannel: {
    screen: EditChannelScreen,
    navigationOptions: {
      title: 'Edit Channel',
      ...headerNavigationOptions,
    },
  },

  editBlock: {
    screen: EditBlockScreen,
    navigationOptions: {
      title: 'Edit Block',
      ...headerNavigationOptions,
    },
  },

  newChannel: {
    screen: NewChannelScreen,
    navigationOptions: {
      title: 'New Channel',
      ...headerNavigationOptions,
    },
  },

  channelVisibility: {
    screen: ChannelVisibility,
    navigationOptions: {
      title: 'Channel Privacy',
      ...headerNavigationOptions,
    },
  },
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
})
