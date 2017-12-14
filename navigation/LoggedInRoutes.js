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
import OnboardingScreen from '../screens/OnboardingScreen'
import ProgressScreen from '../screens/ProgressScreen'
import NotificationsScreen from '../screens/NotificationsScreen'

import Header from '../components/Header'
import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'
import SearchIcon from '../components/SearchIcon'
import BlockEditButton from '../components/BlockEditButton'
import SubmittableHeader from '../components/SubmittableHeader'

import withParams from '../hocs/withParams'

export default ({
  onboarding: {
    screen: OnboardingScreen,
    navigationOptions: {
      header: null,
    },
  },

  feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="Feed"
        headerRight={<HeaderIcon navigation={navigation} />}
      />,
    }),
  },

  notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="Notifications"
      />,
    }),
  },

  block: {
    screen: BlockScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        headerRight={<BlockEditButton id={navigation.state.params.id} />}
      />,
    }),
  },

  text: { // TODO: Rename to `blockText` or like 'blockExpandedText'...
    screen: BlockTextScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="ul"
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
        title="Channel"
        isHeaderTitleVisible={false}
        headerRight={<SearchIcon />}
      />,
    }),
  },

  profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="Profile"
        isHeaderTitleVisible={false}
        headerRight={<SearchIcon />}
      />,
    }),
  },

  me: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="Your Profile"
        isHeaderTitleVisible={false}
        headerRight={<SearchIcon />}
      />,
    }),
  },

  userSettings: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="Settings"
      />,
    }),
  },

  explore: {
    screen: withParams(ExploreScreen),
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        title="Explore"
        headerRight={<HeaderIcon navigation={navigation} />}
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
