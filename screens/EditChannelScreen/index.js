import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import updateChannelMutation from './mutations/updateChannel'
import removeCollaboratorsMutation from './mutations/removeCollaborators'
import editChannelQuery from './queries/editChannel'

import EditChannelForm from './components/EditChannelForm'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class EditChannelScreen extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    updateChannel: PropTypes.func.isRequired,
    removeCollaborators: PropTypes.func.isRequired,
  }

  render() {
    const {
      navigation,
      updateChannel,
      removeCollaborators,
      data: { channel },
    } = this.props

    return (
      <EditChannelForm
        channel={channel}
        updateChannel={updateChannel}
        removeCollaborators={removeCollaborators}
        navigation={navigation}
      />
    )
  }
}

const DecoratedEditChannelScreen = withLoadingAndErrors(EditChannelScreen)

export default compose(
  graphql(editChannelQuery, {
    options: ownProps => ({ variables: { id: ownProps.navigation.state.params.id } }),
  }),
  graphql(removeCollaboratorsMutation, { name: 'removeCollaborators' }),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(DecoratedEditChannelScreen)
