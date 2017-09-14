import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import SearchHeader from '../../components/SearchHeader'
import TabToggle from '../../components/TabToggle'
import SearchContents from './components/SearchContents'

import NavigationService from '../../utilities/navigationService'

import { Colors } from '../../constants/Style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 65,
  },
})

const tabOptions = {
  Channels: 'CHANNEL',
  Users: 'USER',
  Blocks: 'CONNECTABLE',
}

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      q: null,
      type: 'CHANNEL',
    }
    this.onCancel = this.onCancel.bind(this)
    this.onToggle = this.onToggle.bind(this)
  }

  onCancel() {
    NavigationService.back()
    return this
  }

  onToggle(value) {
    const type = tabOptions[value]
    this.setState({ type })
  }

  search(q) {
    this.setState({ q })
  }

  render() {
    const { type } = this.state

    return (
      <View style={styles.container}>
        <SearchHeader
          onCancel={this.onCancel}
          onChangeText={q => this.search(q)}
        />
        <View style={styles.innerContainer}>
          <TabToggle
            selectedSegment={type}
            onToggleChange={this.onToggle}
            options={tabOptions}
            style={{ backgroundColor: Colors.semantic.background }}
          />
          <SearchContents q={this.state.q} type={type} />
        </View>
      </View>
    )
  }
}
