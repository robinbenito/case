import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import NotificationCountWithData from '../../../components/NotificationCount'

const HeaderIcons = props => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <NotificationCountWithData onPress={() => props.navigation.navigate('DrawerOpen')} />
  </View>
)

HeaderIcons.propTypes = {
  navigation: PropTypes.any.isRequired,
}

export default HeaderIcons
