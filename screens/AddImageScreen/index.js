import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import ImageForm from '../../components/Form/ImageForm'

import createBlockMutation from '../AddConnectionScreen/mutations/createBlock'

import addOrConnect from '../../utilities/addOrConnect'

class AddImageScreen extends Component {
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

  onSubmit = ({ title, description, image }) =>
    addOrConnect({
      variables: { title, description, image },
      mutation: this.props.createBlock,
      channel: this.props.channel,
    })

  render() {
    const { navigation } = this.props
    const { block } = navigation.state.params

    return (
      <ImageForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        block={{
          ...block,
          state: 'pending',
        }}
        submitText="Next"
      />
    )
  }
}


export default graphql(createBlockMutation, {
  name: 'createBlock',
})(AddImageScreen)
