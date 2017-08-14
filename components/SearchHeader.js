import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native'

import colors from '../constants/Colors'
import layout from '../constants/Layout'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.gray.background,
    paddingTop: layout.padding * 2.5,
    paddingHorizontal: layout.padding,
    paddingBottom: layout.padding / 2,
    width,
  },
  innerContainer: {
    borderRadius: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 12,
    backgroundColor: colors.gray.border,
    marginRight: layout.padding,
    height: 40,
    padding: layout.padding,
    flex: 1,
  },
})

export default class SearchHeader extends React.Component {
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
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            onChangeText={t => this.onChangeText(t)}
            autoCapitalize="none"
            value={search}
            clearButtonMode="while-editing"
          />
          <Text>
            Cancel
          </Text>
        </View>
      </View>
    )
  }
}

SearchHeader.propTypes = {
  onChangeText: PropTypes.func,
  style: PropTypes.any,
}

SearchHeader.defaultProps = {
  onChangeText: () => null,
  style: {},
}
