import React from 'react'
import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'
import { connect } from 'react-redux'

import BlockScreen from '../screens/BlockScreen'
import BlockTextScreen from '../screens/BlockScreen/components/BlockText' // TODO: Move this to screens
import ChannelScreen from '../screens/ChannelScreen'
import CommentScreen from '../screens/CommentScreen'
import FeedScreen from '../screens/FeedScreen'
import SearchScreen from '../screens/SearchScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'
import EditChannelScreen from '../screens/EditChannelScreen'
import EditBlockScreen from '../screens/EditBlockScreen'
import NewChannelScreen from '../screens/NewChannelScreen'
import ChannelVisibility from '../components/ChannelVisibility' // TODO: Move this to screens
import routesForEditAccountScreens from '../screens/EditAccountScreens/routes'

import AddTextScreen from '../screens/AddTextScreen'
import AddImageScreen from '../screens/AddImageScreen'
import AddLinkScreen from '../screens/AddLinkScreen'
import AddConnectionsScreen from '../screens/AddConnectionScreen'
import AddCollaboratorsScreen from '../screens/AddCollaboratorsScreen'

import Header from '../components/Header'
import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'
import SearchIcon from '../components/SearchIcon'
import BlockEditButton from '../components/BlockEditButton'
import BackButton from '../components/BackButton'

import headerNavigationOptions from '../constants/Header'

import navigateOnce from '../utilities/navigateOnce'

const HeaderWithState = connect(({ ui: { isHeaderTitleVisible } }) => ({
  isHeaderTitleVisible,
}))(Header)

const MainNavigator = enhance(StackNavigator)({
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
        headerRight={<SearchIcon />}
      />,
    }),
  },

  profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      const notMyProfile = navigation.state.params && navigation.state.params.id
      const headerLeft = notMyProfile ? <BackButton /> : null
      const secondary = notMyProfile ? [
        { title: 'Feed', key: 'feed' },
        { title: 'Profile', key: 'profile' },
      ] : [{ title: 'Feed', key: 'feed' }]
      return {
        header: <HeaderWithState
          navigation={navigation}
          primary={{ title: 'Profile' }}
          headerLeft={headerLeft}
          secondary={secondary}
          isHeaderTitleVisible={false}
          headerRight={<SearchIcon />}
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

  search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },

  newText: {
    screen: AddTextScreen,
    navigationOptions: {
      title: 'New Text',
      ...headerNavigationOptions,
    },
  },

  newImage: {
    screen: AddImageScreen,
    navigationOptions: {
      ...headerNavigationOptions,
    },
  },

  newLink: {
    screen: AddLinkScreen,
    navigationOptions: {
      ...headerNavigationOptions,
    },
  },

  connect: {
    screen: AddConnectionsScreen,
    navigationOptions: {
      header: null,
    },
  },

  editChannel: {
    screen: EditChannelScreen,
    navigationOptions: {
      title: 'Edit Channel',
      ...headerNavigationOptions,
    },
  },

  addCollaborators: {
    screen: AddCollaboratorsScreen,
    navigationOptions: {
      header: null,
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

  ...routesForEditAccountScreens,
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
})

MainNavigator.router.getStateForAction = navigateOnce(MainNavigator.router.getStateForAction)

export default MainNavigator
