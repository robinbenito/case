import React from 'react'

import EditAccountNameScreen from './EditAccountNameScreen'
import EditAccountBioScreen from './EditAccountBioScreen'
import EditAccountEmailScreen from './EditAccountEmailScreen'
import EditEmailNotificationsScreen from './EditEmailNotificationsScreen'
import EditAccountReceiveNewsletter from './EditAccountReceiveNewsletter'

import SubmittableHeader from '../../components/SubmittableHeader'

import withParams from '../../hocs/withParams'

export default {
  editAccountName: {
    screen: withParams(EditAccountNameScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Name"
      />,
    }),
  },

  editAccountBio: {
    screen: withParams(EditAccountBioScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Bio"
      />,
    }),
  },

  editAccountEmail: {
    screen: withParams(EditAccountEmailScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Email"
      />,
    }),
  },

  editEmailNotifications: {
    screen: withParams(EditEmailNotificationsScreen),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Email Preferences"
      />,
    }),
  },

  editAccountReceiveNewsletter: {
    screen: withParams(EditAccountReceiveNewsletter),
    navigationOptions: ({ navigation }) => ({
      header: <SubmittableHeader
        navigation={navigation}
        title="Newsletter"
      />,
    }),
  },
}
