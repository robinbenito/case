import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import ImageForm from '../../components/Form/ImageForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import addOrConnect from '../../utilities/addOrConnect'
import navigationService from '../../utilities/navigationService'

import addToWithContext from '../../hocs/addToWithContext'

class AddImageScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createBlock: PropTypes.func.isRequired,
    can: PropTypes.shape({
      add_to: PropTypes.bool.isRequired,
    }).isRequired,
  }

  onSubmit = ({ title, description, image }) => {
    const { can } = this.props
    const { params } = navigationService.getPreviousRoute()

    return addOrConnect({
      variables: { title, description, image },
      mutation: this.props.createBlock,
      // If we `can.add_to` then add to the last channel directly
      ...(can.add_to ? { channel: params } : {}),
    })
  }

  render() {
    const { navigation, can } = this.props
    const { block } = navigation.state.params
    const submitText = can.add_to ? 'Connect' : 'Next'
    return (
      <ImageForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        block={{
          ...block,
          state: 'pending',
        }}
        submitText={submitText}
      />
    )
  }
}

export default graphql(createBlockMutation, {
  name: 'createBlock',
})(addToWithContext(AddImageScreen))
