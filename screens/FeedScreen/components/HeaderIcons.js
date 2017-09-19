import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import NotificationCountWithData from '../../../components/NotificationCount'
// import SearchIcon from '../../../components/SearchIcon'

// import { Units } from '../../../constants/Style'

const HeaderIcons = props => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <NotificationCountWithData onPress={() => props.navigation.navigate('DrawerOpen')} />
    {/* <SearchIcon /> */}
  </View>
)

HeaderIcons.propTypes = {
  navigation: PropTypes.any.isRequired,
}

export default HeaderIcons
