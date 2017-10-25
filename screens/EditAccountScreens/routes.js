import headerNavigationOptions from '../../constants/Header'

import EditAccountNameScreen from './EditAccountNameScreen'
import EditAccountBioScreen from './EditAccountBioScreen'
import EditEmailNotificationsScreen from './EditEmailNotificationsScreen'

export default {
  editAccountName: {
    screen: EditAccountNameScreen,
    navigationOptions: {
      title: 'Name',
      ...headerNavigationOptions,
    },
  },

  editAccountBio: {
    screen: EditAccountBioScreen,
    navigationOptions: {
      title: 'Bio',
      ...headerNavigationOptions,
    },
  },

  editEmailNotifications: {
    screen: EditEmailNotificationsScreen,
    navigationOptions: {
      title: 'Email Preferences',
      ...headerNavigationOptions,
    },
  },
}
