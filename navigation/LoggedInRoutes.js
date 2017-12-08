import React from 'react'

// Show objects
import BlockScreen from '../screens/BlockScreen'
import BlockTextScreen from '../screens/BlockScreen/components/BlockText' // TODO: Move this to screens
import ChannelScreen from '../screens/ChannelScreen'
import CommentScreen from '../screens/CommentScreen'
import FeedScreen from '../screens/FeedScreen'
import SearchScreen from '../screens/SearchScreen'
import ExploreScreen from '../screens/ExploreScreen'
import ProfileScreen from '../screens/ProfileScreen'
// New objects
import NewChannelScreen from '../screens/NewChannelScreen'
import AddTextScreen from '../screens/AddTextScreen'
import AddImageScreen from '../screens/AddImageScreen'
import AddLinkScreen from '../screens/AddLinkScreen'
import AddConnectionsScreen from '../screens/AddConnectionScreen'
import AddCollaboratorsScreen from '../screens/AddCollaboratorsScreen'
// Edit objects
import UserSettingsScreen from '../screens/UserSettingsScreen'
import EditChannelScreen from '../screens/EditChannelScreen'
import EditBlockScreen from '../screens/EditBlockScreen'
import ChannelVisibilityScreen from '../screens/ChannelVisibilityScreen'
import routesForEditAccountScreens from '../screens/EditAccountScreens/routes'
// Misc.
import ProgressScreen from '../screens/ProgressScreen'
import NotificationsScreen from '../screens/NotificationsScreen'

import Header from '../components/Header'
import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'
import SearchIcon from '../components/SearchIcon'
import BlockEditButton from '../components/BlockEditButton'
import BackButton from '../components/BackButton'
import SubmittableHeader from '../components/SubmittableHeader'

import withParams from '../hocs/withParams'

export default ({
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

  notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: 'Notifications' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
        headerLeft={<BackButton />}
      />,
    }),
  },

  block: {
    screen: BlockScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: '' }}
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
      header: <SubmittableHeader
        navigation={navigation}
        title={navigation.state.params.title}
      />,
    }),
  },

  channel: {
    screen: withParams(ChannelScreen),
    navigationOptions: ({ navigation }) => ({
      header: <Header
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
        header: <Header
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

  explore: {
    screen: ExploreScreen,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
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

  progress: {
    screen: withParams(ProgressScreen),
    navigationOptions: {
      header: null,
    },
  },

  newText: {
    screen: withParams(AddTextScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="New Text"
      />,
    }),
  },

  newImage: {
    screen: withParams(AddImageScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Upload Image"
      />,
    }),
  },

  newLink: {
    screen: withParams(AddLinkScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Add Link"
      />,
    }),
  },

  connect: {
    screen: AddConnectionsScreen,
    navigationOptions: {
      header: null,
    },
  },

  editChannel: {
    screen: EditChannelScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Edit Channel"
      />,
    }),
  },

  addCollaborators: {
    screen: AddCollaboratorsScreen,
    navigationOptions: {
      header: null,
    },
  },

  editBlock: {
    screen: EditBlockScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Edit Block"
      />,
    }),
  },

  newChannel: {
    screen: NewChannelScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="New Channel"
      />,
    }),
  },

  channelVisibility: {
    screen: ChannelVisibilityScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Channel Privacy"
      />,
    }),
  },

  ...routesForEditAccountScreens,
})
