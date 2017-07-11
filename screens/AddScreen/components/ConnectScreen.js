import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'

import RecentConnectionsWithData from '../../../components/RecentConnections'
import ConnectionSearchWithData from '../../../components/ConnectionSearch'
import SearchField from '../../../components/SearchField'

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

export default class ConnectScreen extends React.Component {
  constructor(props) {
    super(props)

    const { image, text } = props.navigation.state.params
    this.state = {
      isSearching: false,
      q: null,
      connections: [],
      image,
      text,
    }
  }

  search(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    })
  }

  render() {
    const { width } = Dimensions.get('window')
    const { search, text, image } = this.state

    const imageStyle = {
      width: width - (layout.padding * 2),
      height: width - (layout.padding * 2),
      resizeMode: 'contain',
      marginTop: (layout.padding / 2),
      borderWidth: 1,
      borderColor: colors.gray.border,
    }

    const ConnectionContent = this.state.isSearching ?
      <ConnectionSearchWithData q={search} onSelectConnection={this.onSelectConnection} /> :
      <RecentConnectionsWithData onSelectConnection={this.onSelectConnection} />

    return (
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
    )
  }
}

ConnectScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    state: PropTypes.any,
  }).isRequired,
}
