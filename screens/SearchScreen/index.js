import React from 'react'
import {
  Text,
  View
} from 'react-native'

import { NavigationActions } from 'react-navigation'

import SearchHeader from '../../components/SearchHeader'

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
  }

  onCancel() {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { navigation } = this.props
    return (
      <View >
        <SearchHeader onCancel={this.onCancel} />
      </View>
    )
  }
}
