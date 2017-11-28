import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Clipboard, Keyboard } from 'react-native'
import { isURL } from 'validator'
import { graphql } from 'react-apollo'

import LinkForm from '../../components/Form/LinkForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import wait from '../../utilities/wait'
import addOrConnect from '../../utilities/addOrConnect'

class AddLinkScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createBlock: PropTypes.func.isRequired,
    channel: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    channel: null,
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

  onSubmit = ({ source_url }) =>
    addOrConnect({
      variables: { source_url },
      mutation: this.props.createBlock,
      channel: this.props.channel,
    })

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

export default graphql(createBlockMutation, {
  name: 'createBlock',
})(AddLinkScreen)

