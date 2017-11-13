import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextForm from '../../components/Form/TextForm'

import navigationService from '../../utilities/navigationService'

export default class AddTextScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    navigation: {},
  }

  onSubmit = ({ title, description, content }) =>
    navigationService.navigate('connect', {
      title,
      description,
      content,
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
