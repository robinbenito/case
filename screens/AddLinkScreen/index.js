import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Clipboard,
  Keyboard,
} from 'react-native'
import { isURL } from 'validator'

import BackButton from '../../components/BackButton'
import LinkForm from '../../components/Form/LinkForm'

import NavigatorService from '../../utilities/navigationService'

const navigationOptions = {
  title: 'Paste Link',
  headerLeft: (<BackButton />),
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
  }

  componentDidMount() {
    Clipboard.getString().then((string) => {
      if (isURL(string)) {
        Keyboard.dismiss()
        this.clipboardPrompt(string)
        Clipboard.setString('')
      }
    })
  }

  onSubmit = (variables) => {
    const { source_url } = variables
    NavigatorService.navigate('connect', { source_url })
  }

  setUrl(url) {
    this.setState({
      source_url: url,
    })
  }

  clipboardPrompt = (url) => {
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
    const { navigation } = this.props
    return (
      <LinkForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={navigationOptions}
        block={{ source: { url: this.state.source_url } }}
      />
    )
  }
}

AddLinkScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}

AddLinkScreen.defaultProps = {
  navigation: {},
}
