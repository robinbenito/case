// 1. recent connection query and search query in the same component
// 2. if searchbar is active, make the search query, if not, show recent connections
// 3. data comes from either query
// 4. if the item is selected, dont show it
// 5. make the connections when button is pressed

import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { NavigationActions } from 'react-navigation'

import SearchHeader from '../../../components/SearchHeader'
import ChannelItem from '../../../components/ChannelItem'
import BottomButton from '../../../components/BottomButton'

import uploadImage from '../../../api/uploadImage'

import layout from '../../../constants/Layout'

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
    fontSize: 12,
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f7f7f7',
    color: '#585858',
    borderColor: '#cbcbcb',
    borderWidth: 1,
  },
})

class SelectChannelScreen extends React.Component {
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
    } = props.navigation.state.params

    this.state = {
      isSearching: false,
      q: null,
      selectedConnections: [],
      image,
      content,
      description,
      title,
    }
    this.onToggleConnection = this.onToggleConnection.bind(this)
    this.saveConnections = this.saveConnections.bind(this)
    this.navigateBack = this.navigateBack.bind(this)
  }

  componentDidMount() {
    if (this.state.image) {
      this.props.navigation.setParams({
        title: 'New Image',
      })
    }
  }

  onToggleConnection(connection, isSelected) {
    const connections = this.state.selectedConnections
    const arrayMethod = isSelected ? 'unshift' : 'pop'
    connections[arrayMethod](connection)
    this.setState({
      selectedConnections: connections,
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
    const { title, content, description } = this.state
    this.maybeUploadImage()
      .then((response) => {
        const channelIds = this.state.selectedConnections.map(channel => channel.id)
        let variables = { channel_ids: channelIds, title, description }

        if (response) {
          // This is an image
          variables = Object.assign({}, variables, {
            source_url: response.location,
          })
        } else {
          // This is a piece of text
          variables = Object.assign({}, variables, {
            content,
          })
        }

        this.props.mutate({ variables })
          .then(this.navigateBack)
      })
      .catch((error) => {
        console.log('Error uploading image', error)
      })
  }

  search(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    })
  }

  render() {
    const { search, selectedConnections } = this.state

    const selectedChannelsContent = selectedConnections.length ? (
      <View>
        <Text style={styles.label}>Selected channels</Text>
        <FlatList
          data={selectedConnections}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ChannelItem
              channel={item}
              isSelected
              onToggleSelect={this.onToggleConnection}
            />
          )}
        />
      </View>
    ) : null

    const ConnectButton = selectedConnections.length ?
      (<BottomButton
        text="Save and Connect"
        onPress={this.saveConnections}
      />) : null

    return (
      <View style={styles.container}>
        <SearchHeader
          style={styles.input}
          onChangeText={t => this.search(t)}
        />
        <View style={styles.innerContainer}>
          {selectedChannelsContent}
          <Text style={styles.label}>Recent channels</Text>
          <FlatList
            data={selectedConnections}
            extraData={this.state}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ChannelItem
                channel={item}
                isSelected
                onToggleSelect={this.onToggleConnection}
              />
            )}
          />
        </View>
        {ConnectButton}
      </View>
    )
  }
}

SelectChannelScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  mutate: PropTypes.any.isRequired,
}

const recentConnectionsQuery = gql`
  query RecentConnectionsQuery {
    me {
      name
      recent_connections(per: 5) {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

const connectionSearchQuery = gql`
  query ConnectionSearchQuery($q: String!) {
    me {
      connection_search(q: $q) {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

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

const SelectChannelScreenWithData = compose(
  graphql(connectMutation),
  graphql(recentConnectionsQuery, { name: 'recentConnections' }),
  graphql(connectionSearchQuery, { name: 'connectionSearch' }),
)(SelectChannelScreen)

export default SelectChannelScreenWithData
