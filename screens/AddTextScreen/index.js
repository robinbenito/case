import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import TextForm from '../../components/Form/TextForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import addOrConnect from '../../utilities/addOrConnect'
import navigationService from '../../utilities/navigationService'

import addToWithContext from '../../hocs/addToWithContext'

class AddTextScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createBlock: PropTypes.func.isRequired,
    can: PropTypes.shape({
      add_to: PropTypes.bool.isRequired,
    }).isRequired,
  }

  onSubmit = ({ title, description, content }) => {
    const { can } = this.props
    const { params } = navigationService.getPreviousRoute()

    return addOrConnect({
      variables: { title, description, content },
      mutation: this.props.createBlock,
      // If we `can.add_to` then add to the last channel directly
      ...(can.add_to ? { channel: params } : {}),
    })
  }

  render() {
    const { navigation, can } = this.props
    const submitText = can.add_to ? 'Connect' : 'Next'

    return (
      <TextForm
        onSubmit={this.onSubmit}
        submitText={submitText}
        navigation={navigation}
      />
    )
  }
}

export default graphql(createBlockMutation, {
  name: 'createBlock',
})(addToWithContext(AddTextScreen))
