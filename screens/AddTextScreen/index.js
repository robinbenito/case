import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import TextForm from '../../components/Form/TextForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import addOrConnect from '../../utilities/addOrConnect'

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

  onSubmit = ({ title, description, content }) =>
    addOrConnect({
      variables: { title, description, content },
      mutation: this.props.createBlock,
      channel: this.props.channel,
    })

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
