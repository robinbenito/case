import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Clipboard, Keyboard } from 'react-native'
import { isURL } from 'validator'
import { graphql } from 'react-apollo'

import LinkForm from '../../components/Form/LinkForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import wait from '../../utilities/wait'
import addOrConnect from '../../utilities/addOrConnect'
import navigationService from '../../utilities/navigationService'

import addToWithContext from '../../hocs/addToWithContext'

class AddLinkScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createBlock: PropTypes.func.isRequired,
    can: PropTypes.shape({
      add_to: PropTypes.bool.isRequired,
    }).isRequired,
  }

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

  onSubmit = ({ source_url }) => {
    const { can } = this.props
    const { params } = navigationService.getPreviousRoute()

    return addOrConnect({
      variables: { source_url },
      mutation: this.props.createBlock,
      // If we `can.add_to` then add to the last channel directly
      ...(can.add_to ? { channel: params } : {}),
    })
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
    const { navigation, can } = this.props
    const submitText = can.add_to ? 'Connect' : 'Next'
    return (
      <LinkForm
        navigation={navigation}
        onSubmit={this.onSubmit}
        submitText={submitText}
        block={{
          state: 'pending',
          source: { url: this.state.source_url },
        }}
      />
    )
  }
}

export default graphql(createBlockMutation, {
  name: 'createBlock',
})(addToWithContext(AddLinkScreen))
