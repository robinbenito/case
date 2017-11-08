import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Clipboard, Keyboard } from 'react-native'
import { isURL } from 'validator'

import LinkForm from '../../components/Form/LinkForm'

import wait from '../../utilities/wait'
import navigationService from '../../utilities/navigationService'

export default class AddLinkScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      source_url: '',
    }
  }

  componentDidMount() {
    Clipboard
      .getString()
      .then((string) => {
        if (isURL(string)) {
          this.clipboardPrompt(string)

          Clipboard.setString('')

          return wait(100)
            .then(() =>
              Keyboard.dismiss(),
            )
        }
      })
  }

  onSubmit = ({ source_url }) =>
    navigationService.navigate('connect', { source_url })

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
        navigation={navigation}
        onSubmit={this.onSubmit}
        submitText="Next"
        block={{
          state: 'pending',
          source: { url: this.state.source_url },
        }}
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
