import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { concat, reject } from 'lodash'

import {
  StyleSheet,
  View,
} from 'react-native'

import { NavigationActions } from 'react-navigation'

import SelectedChannels from './SelectedChannels'

import SearchHeader from '../SearchHeader'
import SearchConnectionsWithData from './SearchConnections'
import RecentConnectionsWithData from './RecentConnections'

import uploadImage from '../../api/uploadImage'

import layout from '../../constants/Layout'
import type from '../../constants/Type'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: layout.padding,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    marginTop: 100,
  },
  label: {
    fontSize: type.sizes.small,
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    color: '#585858',
    borderColor: '#cbcbcb',
    borderWidth: 1,
  },
})

class SelectConnectionScreen extends React.Component {
  static navigationOptions() {
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props)

    const {
      image,
      content,
      description,
      title,
      source_url,
    } = props.navigation.state.params

    this.state = {
      isSearching: false,
      q: null,
      selectedConnections: [],
      search: null,
      image,
      content,
      description,
      title,
      source_url,
    }
    this.onToggleConnection = this.onToggleConnection.bind(this)
    this.saveConnections = this.saveConnections.bind(this)
    this.navigateBack = this.navigateBack.bind(this)
  }

  onToggleConnection(connection, isSelected) {
    const connections = this.state.selectedConnections
    let newConnections

    if (isSelected) {
      newConnections = concat(connections, connection)
    } else {
      newConnections = reject(connections, existingConnection =>
        connection.id === existingConnection.id,
      )
    }

    this.setState({
      selectedConnections: newConnections,
    })
  }

  maybeUploadImage() {
    const { image } = this.state
    if (!image) return new Promise(resolve => resolve())
    return uploadImage(image)
  }

  navigateBack() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'addMenu' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  saveConnections() {
    const { title, content, description, source_url } = this.state
    this.maybeUploadImage()
      .then((response) => {
        const channelIds = this.state.selectedConnections.map(channel => channel.id)
        let variables = { channel_ids: channelIds, title, description }

        if (response) {
          // This is an image
          variables = Object.assign({}, variables, {
            source_url: response.location,
          })
        } else if (content) {
          // This is a piece of text
          variables = Object.assign({}, variables, {
            content,
          })
        } else {
          variables = Object.assign({}, variables, {
            source_url,
          })
        }

        console.log('variables', variables)

        this.props.mutate({ variables })
          .then(this.navigateBack)
      })
  }

  search(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    })
  }

  render() {
    const { search, selectedConnections, isSearching, title } = this.state

    const ConnectionContent = isSearching ? (
      <SearchConnectionsWithData
        q={search}
        key={`search-${selectedConnections.length}`}
        selected={selectedConnections}
        onToggleConnection={this.onToggleConnection}
      />
    ) : (
      <RecentConnectionsWithData
        selected={selectedConnections}
        key={`recent-${selectedConnections.length}`}
        onToggleConnection={this.onToggleConnection}
      />
    )

    const cancelOrDone = selectedConnections.length > 0 ? 'Done' : 'Cancel'

    return (
      <View style={styles.container}>
        <SearchHeader
          style={styles.input}
          onChangeText={t => this.search(t)}
          cancelOrDone={cancelOrDone}
          onSubmit={this.saveConnections}
        />
        <View style={styles.innerContainer}>
          <SelectedChannels
            onRemove={channel => this.onToggleConnection(channel, false)}
            channels={selectedConnections}
            title={title || 'Untitled block'}
            key={`selected-${selectedConnections.length}`}
          />
          {ConnectionContent}
        </View>
      </View>
    )
  }
}

SelectConnectionScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  mutate: PropTypes.any.isRequired,
}

SelectConnectionScreen.defaultProps = {
  q: '',
  searchData: {},
}

const connectMutation = gql`
  mutation createBlockMutation($channel_ids: [ID]!, $title: String, $content: String, $description: String, $source_url: String){
    create_block(input: { channel_ids: $channel_ids, title: $title, content: $content, description: $description, source_url: $source_url }) {
      clientMutationId
      block {
        id
        title
      }
    }
  }
`

const SelectConnectionScreenWithData = graphql(connectMutation)(SelectConnectionScreen)

export default SelectConnectionScreenWithData
