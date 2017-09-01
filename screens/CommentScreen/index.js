import React from 'react'
import PropTypes from 'prop-types'

import {
  Keyboard,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import BlockComments from '../BlockScreen/components/BlockComments'
import CommentForm from './components/CommentForm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


export default class CommentScreen extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <ScrollView>
          <BlockComments id={id} />
        </ScrollView>
        <CommentForm id={id} />
        <KeyboardSpacer />
      </View>
    )
  }
}

CommentScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
