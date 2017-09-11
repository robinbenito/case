import React from 'react'
import { View } from 'react-native'

import NotificationCountWithData from '../../../components/NotificationCount'
import SearchIcon from '../../../components/SearchIcon'

import { Units } from '../../../constants/Style'

export default props => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: Units.base }}>
    <NotificationCountWithData onPress={() => props.navigation.navigate('DrawerOpen')} />
    <SearchIcon />
  </View>
)