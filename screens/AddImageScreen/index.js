import React from 'react'
import PropTypes from 'prop-types'

import ImageForm from '../../components/Form/ImageForm'

import NavigatorService from '../../utilities/navigationService'

export default class AddImageScreen extends React.Component {
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
        block={{
          ...block,
          state: 'pending',
        }}
        submitText="Next"
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
