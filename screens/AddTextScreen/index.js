import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import TextForm from '../../components/Form/TextForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import navigationService from '../../utilities/navigationService'

class AddTextScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    channel: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
    createBlock: PropTypes.func.isRequired,
  }

  static defaultProps = {
    channel: null,
  }

  onSubmit = ({ title, description, content }) => {
    const { channel, createBlock } = this.props

    if (channel) {
      const promise = createBlock({
        variables: {
          title,
          description,
          content,
          channel_ids: [channel.id],
        },
      })

      navigationService.navigate('progress', {
        promise,
        label: `Connecting to ${channel.title}`,
        done: () =>
          navigationService.navigate('channel', channel),
      })

      return promise
    }

    navigationService.navigate('connect', {
      title, description, content,
    })
  }

  render() {
    const { navigation } = this.props

    return (
      <TextForm
        onSubmit={this.onSubmit}
        submitText="Next"
        navigation={navigation}
      />
    )
  }
}

export default graphql(createBlockMutation, {
  name: 'createBlock',
})(AddTextScreen)
