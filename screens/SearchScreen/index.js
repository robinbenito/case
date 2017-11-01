import React, { Component } from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import styled from 'styled-components/native'

import SearchHeader from '../../components/SearchHeader'
import TabToggle from '../../components/TabToggle'
import SearchContents from './components/SearchContents'
import { StatusBarAwareContainer } from '../../components/UI/Layout'

import navigationService from '../../utilities/navigationService'

const TAB_OPTIONS = {
  Channels: 'CHANNEL',
  Users: 'USER',
  Blocks: 'CONNECTABLE',
}

const TabbedResults = styled.View`
  flex: 1;
`

export default class SearchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      q: null,
      type: 'CHANNEL',
    }
  }

  onCancel = () =>
    navigationService.back()

  onToggle = type =>
    this.setState({ type })

  search = (query) => {
    const q = query === '' ? null : query
    this.setState({ q })
  }

  render() {
    const { q, type } = this.state

    return (
      <StatusBarAwareContainer>
        <SearchHeader
          onCancel={this.onCancel}
          onChangeText={this.search}
          autoFocus
        />

        <TabbedResults>
          <TabToggle
            selectedSegment={type}
            onToggleChange={this.onToggle}
            options={TAB_OPTIONS}
          />

          <SearchContents q={q} type={type} />
        </TabbedResults>

        <KeyboardSpacer />
      </StatusBarAwareContainer>
    )
  }
}
