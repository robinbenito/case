import React from 'react'
import PropTypes from 'prop-types'

import BackButton from '../../components/BackButton'
import TextForm from '../../components/Form/TextForm'

import NavigatorService from '../../utilities/navigationService'


const navigationOptions = {
  title: 'New Text',
  headerLeft: (<BackButton />),
}

export default class AddTextScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  onSubmit() {
    const { title, description, content } = this.state
    NavigatorService.navigate('connect', { title, description, content })
  }

  render() {
    const { navigation } = this.props
    return (
      <TextForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={navigationOptions}
      />
    )
  }
}

AddTextScreen.propTypes = {
  navigation: PropTypes.any,
}

AddTextScreen.defaultProps = {
  navigation: () => null,
}
