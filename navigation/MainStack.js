import React from 'react'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import AddConnectionScreen from '../screens/AddConnectionScreen'
import BlockScreen from '../screens/BlockScreen'
import BlockTextScreen from '../screens/BlockScreen/components/BlockText' // TODO: Move this to screens
import ChannelScreen from '../screens/ChannelScreen'
import CommentScreen from '../screens/CommentScreen'
import FeedScreen from '../screens/FeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'

import Header from '../components/Header'
import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'
import BackButton from '../components/BackButton'

const HeaderWithState = connect(({ ui: { isHeaderTitleVisible } }) => ({
  isHeaderTitleVisible,
}))(Header)

export default StackNavigator({
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
      />,
    }),
  },
  addConnection: {
    screen: AddConnectionScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header
        navigation={navigation}
        primary={{ title: 'Add Connection' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
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
      header: <Header
        navigation={navigation}
        primary={{ title: 'Comment' }}
        secondary={[
          { title: 'Your profile', key: 'profile' },
          { title: 'Feed', key: 'feed' },
        ]}
      />,
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
      const headerLeft = navigation.state.params ? <BackButton /> : null
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
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
})
