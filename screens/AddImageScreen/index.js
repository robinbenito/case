import React from 'react'
import PropTypes from 'prop-types'

import BackButton from '../../components/BackButton'
import ImageForm from '../../components/Form/ImageForm'

import NavigatorService from '../../utilities/navigationService'

const navigationOptions = {
  title: 'New Image',
  headerLeft: (<BackButton />),
}

export default class AddImageScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)
    const { image } = props.navigation.state.params
    this.state = {
      image,
      title: image.split('/').pop(),
      description: '',
    }
  }

  onSubmit = (variables) => {
    const { title, description, image } = variables
    NavigatorService.navigate('connect', { title, description, image })
  }

  render() {
    const { navigation } = this.props
    const { image, title, description } = this.state
    return (
      <ImageForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={navigationOptions}
        block={{ image, title, description }}
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
