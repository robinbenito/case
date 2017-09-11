import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import colors from '../constants/Colors'
import layout from '../constants/Layout'
import type from '../constants/Type'

import navigationService from '../utilities/navigationService'

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
    fontSize: type.sizes.normal,
    backgroundColor: colors.gray.border,
    marginRight: layout.padding,
    height: 40,
    padding: layout.padding,
    flex: 4,
  },
  text: {
    minWidth: layout.padding * 5,
    fontSize: type.sizes.normal,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.gray.text,
  },
})

export default class SearchHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearching: false,
      search: '',
      isSubmitting: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.setState({ isSubmitting: true })
    this.props.onSubmit()
  }

  onChangeText(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    })
    this.props.onChangeText(text)
  }

  render() {
    const { style, cancelOrDone, onCancel } = this.props
    const { search, isSubmitting } = this.state
    const buttonFunc = cancelOrDone === 'Cancel' ? onCancel : this.onSubmit

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            style={[styles.input, style]}
            onChangeText={t => this.onChangeText(t)}
            autoCapitalize="none"
            value={search}
            clearButtonMode="while-editing"
            autoFocus
          />
          <TouchableOpacity onPress={buttonFunc} disabled={isSubmitting}>
            <Text style={styles.text}>
              {cancelOrDone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

SearchHeader.propTypes = {
  onChangeText: PropTypes.func,
  style: PropTypes.any,
  cancelOrDone: PropTypes.oneOf(['Cancel', 'Done']),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

SearchHeader.defaultProps = {
  onChangeText: () => null,
  onSubmit: () => null,
  onCancel: () => navigationService.reset('addMenu'),
  style: {},
  cancelOrDone: 'Cancel',
}
