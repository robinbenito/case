import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Clipboard,
  StyleSheet,
  View,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isURL } from 'validator'

import FieldSet from '../../../components/FieldSet'
import HeaderRightButton from '../../../components/HeaderRightButton'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.background,
  },
  fieldset: {
    marginTop: layout.padding * 2,
  },
})

const navigationOptions = {
  title: 'New Link',
  headerLeft: null,
}

export default class AddLinkScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)
    this.state = {
      source_url: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.clipboardPrompt = this.clipboardPrompt.bind(this)
  }

  componentDidMount() {
    Clipboard.getString().then((string) => {
      if (isURL(string)) this.clipboardPrompt(string)
      Clipboard.setString('')
    })
  }

  componentDidUpdate() {
    // Hide or show the done button depending on if content is present
    if (this.state.source_url && isURL(this.state.source_url)) {
      this.setNavOptions({
        headerRight: (
          <HeaderRightButton onPress={this.onSubmit} text="Done" />
        ),
      })
    } else {
      this.setNavOptions({
        headerRight: null,
      })
    }
  }

  onFieldChange(key, value) {
    this.setState({
      [key]: value,
    })
  }

  onSubmit() {
    const { source_url } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { source_url },
    })

    this.props.navigation.dispatch(navigateAction)
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  setUrl(url) {
    this.setState({
      source_url: url,
    })
  }

  clipboardPrompt(url) {
    Alert.alert(
      'Would you like to paste the URL on your clipboard here?',
      `Add ${url} to the source area?`,
      [
        { text: 'Don\'t Allow', style: 'cancel' },
        { text: 'OK', onPress: () => this.setUrl(url) },
      ],
      { cancelable: false },
    )
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.container}>
          <FieldSet
            isFirst
            style={styles.fieldset}
            label="Link"
            onChange={this.onFieldChange}
            fields={[
              {
                key: 'source_url',
                placeholder: 'URL',
                type: 'url',
                value: this.state.source_url,
              },
            ]}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

AddLinkScreen.propTypes = {
  navigation: PropTypes.any,
}

AddLinkScreen.defaultProps = {
  navigation: () => null,
}
