import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import layout from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  input: {
    borderRadius: 0.125,
    fontSize: 12,
    color: '#000',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    padding: (layout.padding / 2),
  },
})

export default class SearchField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearching: false,
      search: '',
    }
  }

  onChangeText(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    })
    this.props.onChangeText(text)
  }

  render() {
    const { style } = this.props
    const { search } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, style]}
          onChangeText={t => this.onChangeText(t)}
          autoCapitalize="none"
          value={search}
          clearButtonMode="while-editing"
        />
      </View>
    )
  }
}

SearchField.propTypes = {
  onChangeText: PropTypes.func,
  style: PropTypes.any,
}

SearchField.defaultProps = {
  onChangeText: () => null,
  style: {},
}
