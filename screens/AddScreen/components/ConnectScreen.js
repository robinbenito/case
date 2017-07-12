import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { NavigationActions } from 'react-navigation'

import RecentConnectionsWithData from '../../../components/RecentConnections'
import ConnectionSearchWithData from '../../../components/ConnectionSearch'

import SearchField from '../../../components/SearchField'
import BottomButton from '../../../components/BottomButton'

import uploadImage from '../../../api/uploadImage'

import colors from '../../../constants/Colors'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: layout.padding,
    backgroundColor: '#fff',
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

class ConnectScreen extends React.Component {
  constructor(props) {
    super(props)

    const { image, text } = props.navigation.state.params
    this.state = {
      isSearching: false,
      q: null,
      selectedConnections: [],
      image,
      text,
    }
    this.onToggleConnection = this.onToggleConnection.bind(this)
    this.saveConnections = this.saveConnections.bind(this)
    this.navigateToAddScreen = this.navigateToAddScreen.bind(this)
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

  navigateToAddScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'add' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  saveConnections() {
    this.maybeUploadImage()
      .then((response) => {
        const channelIds = this.state.selectedConnections.map(channel => channel.slug)
        let variables = { channel_ids: channelIds }

        if (response) {
          // This is an image
          variables = Object.assign({}, variables, {
            source_url: response.location,
          })
        } else {
          // This is a piece of text
          variables = {
            content: this.state.text,
          }
        }

        this.props.mutate({ variables }).then(this.navigateToAddScreen)
      })
  }

  search(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    })
  }

  render() {
    const { width } = Dimensions.get('window')
    const { search, text, image, selectedConnections } = this.state

    const imageStyle = {
      width: width - (layout.padding * 2),
      height: width - (layout.padding * 2),
      resizeMode: 'contain',
      marginTop: (layout.padding / 2),
      borderWidth: 1,
      borderColor: colors.gray.border,
    }

    const ConnectionContent = this.state.isSearching ?
      <ConnectionSearchWithData q={search} onToggleConnection={this.onToggleConnection} /> :
      <RecentConnectionsWithData onToggleConnection={this.onToggleConnection} />

    const ConnectButton = selectedConnections.length ?
      (<BottomButton
        text="Save and Connect"
        onPress={this.saveConnections}
      />) : null

    return (
      <View>
        <ScrollView>
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <Text>{text}</Text>
            <Image
              source={{ uri: image }}
              style={imageStyle}
            />
            <SearchField
              style={styles.input}
              onChangeText={t => this.search(t)}
            />
            <Text style={styles.label}>Recent channels</Text>
            {ConnectionContent}
          </KeyboardAvoidingView>
        </ScrollView>
        {ConnectButton}
      </View>
    )
  }
}

ConnectScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    state: PropTypes.any,
  }).isRequired,
  mutate: PropTypes.any.isRequired,
}

const connectMutation = gql`
  mutation createBlockMutation($channel_ids: [ID], $title: String, $content: String, $description: String, $source_url: String){
    createBlock(input: { channel_ids: $channel_ids, title: $title, content: $content, description: $description, source_url: $source_url }) {
      clientMutationId
      block {
        id
        title
        connections {
          id
          title
        }
      }
    }
  }
`

const ConnectScreenWithData = graphql(connectMutation)(ConnectScreen)

export default ConnectScreenWithData
