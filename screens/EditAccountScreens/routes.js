import React from 'react'

import EditAccountNameScreen from './EditAccountNameScreen'
import EditAccountBioScreen from './EditAccountBioScreen'
import EditAccountEmailScreen from './EditAccountEmailScreen'
import EditEmailNotificationsScreen from './EditEmailNotificationsScreen'
import EditAccountReceiveNewsletter from './EditAccountReceiveNewsletter'

import SubmittableHeader from '../../components/SubmittableHeader'

export default {
  editAccountName: {
    screen: EditAccountNameScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Name"
      />,
    }),
  },

  editAccountBio: {
    screen: EditAccountBioScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Bio"
      />,
    }),
  },

  editAccountEmail: {
    screen: EditAccountEmailScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Email"
      />,
    }),
  },

  editEmailNotifications: {
    screen: EditEmailNotificationsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Email Preferences"
      />,
    }),
  },

  editAccountReceiveNewsletter: {
    screen: EditAccountReceiveNewsletter,
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Newsletter"
      />,
    }),
  },
}
