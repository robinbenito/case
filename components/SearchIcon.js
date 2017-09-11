import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NavigationService from '../utilities/navigationService'

import { Colors } from '../constants/Style'

export default props => (
  <TouchableWithoutFeedback onPress={() => NavigationService.navigate('searchModal') }>
    <Ionicons name='ios-search-outline' size={25} color={Colors.gray.medium} />
  </TouchableWithoutFeedback>
)