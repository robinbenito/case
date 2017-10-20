import React from 'react'
import PropTypes from 'prop-types'

import BackButton from '../../components/BackButton'
import ImageForm from '../../components/Form/ImageForm'

import NavigatorService from '../../utilities/navigationService'

const navigationOptions = {
  title: 'Upload Image',
  headerLeft: (<BackButton />),
}

export default class AddImageScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  onSubmit = (variables) => {
    const { title, description, image } = variables
    NavigatorService.navigate('connect', { title, description, image })
  }

  render() {
    const { navigation } = this.props
    const { block } = navigation.state.params
    return (
      <ImageForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={navigationOptions}
        block={block}
      />
    )
  }
}

AddImageScreen.propTypes = {
  navigation: PropTypes.any,
}

AddImageScreen.defaultProps = {
  navigation: () => null,
}
