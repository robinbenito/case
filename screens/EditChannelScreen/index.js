import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import updateChannelMutation from './mutations/updateChannel'
import removeChannelMemberMutation from './mutations/removeChannelMember'
import deleteChannelMutation from './mutations/deleteChannel'
import editChannelQuery from './queries/editChannel'

import EditChannelForm from './components/EditChannelForm'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class EditChannelScreen extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    updateChannel: PropTypes.func.isRequired,
    removeChannelMember: PropTypes.func.isRequired,
    deleteChannel: PropTypes.func.isRequired,
  }

  render() {
    const {
      navigation,
      updateChannel,
      removeChannelMember,
      deleteChannel,
      data: { channel },
    } = this.props

    return (
      <EditChannelForm
        channel={channel}
        updateChannel={updateChannel}
        removeChannelMember={removeChannelMember}
        deleteChannel={deleteChannel}
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
  graphql(removeChannelMemberMutation, { name: 'removeChannelMember' }),
  graphql(deleteChannelMutation, { name: 'deleteChannel' }),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(DecoratedEditChannelScreen)
