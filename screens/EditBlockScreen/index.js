import React from 'react'
import PropTypes from 'prop-types'

import EditBlockForm from './components/EditBlockForm'

class EditBlockScreen extends React.Component {
  render() {
    const { navigation, navigation: { state: { params: { id } } } } = this.props

    return (
      <EditBlockForm
        id={id}
        navigation={navigation}
      />
    )
  }
}

EditBlockScreen.propTypes = {
  navigation: PropTypes.object,
}

EditBlockScreen.defaultProps = {
  navigation: {},
}

export default EditBlockScreen
