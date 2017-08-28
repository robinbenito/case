import React from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import BlockComments from '../BlockScreen/components/BlockComments'
import CommentForm from './components/CommentForm'

import layout from '../../constants/Layout'
import colors from '../../constants/Colors'
import typesizes from '../../constants/Type'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    fontSize: typesizes.sizes.medium,
    borderTopWidth: 1,
    borderTopColor: colors.gray.border,
    left: 0,
    right: 0,
    bottom: 0,
    padding: layout.padding,
  },
})


export default class CommentScreen extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <BlockComments id={id} />
        <CommentForm id={id} />
        <KeyboardSpacer />
      </View>
    )
  }
}

CommentScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
