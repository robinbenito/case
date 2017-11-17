import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ChannelForm from '../../../components/Form/ChannelForm'
import { ChannelQuery } from '../../ChannelScreen/components/ChannelContainer'

import navigationService from '../../../utilities/navigationService'
import alertErrors from '../../../utilities/alertErrors'

export default class EditChannelForm extends Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    updateChannel: PropTypes.func.isRequired,
    removeCollaborators: PropTypes.func.isRequired,
    deleteChannel: PropTypes.func.isRequired,
  }

  onSubmit = ({ visibility, ...rest }) => {
    const { channel: { id }, updateChannel } = this.props

    return updateChannel({
      variables: {
        id,
        visibility: visibility.toUpperCase(),
        ...rest,
      },

      refetchQueries: [
        {
          query: ChannelQuery,
          variables: {
            id,
          },
        },
      ],
    })

    .then(() => navigationService.back())
    .catch(alertErrors)
  }

  render() {
    const {
      channel,
      navigation,
      removeCollaborators,
      deleteChannel,
    } = this.props

    return (
      <ChannelForm
        channel={channel}
        navigation={navigation}
        onSubmit={this.onSubmit}
        removeCollaborators={removeCollaborators}
        deleteChannel={deleteChannel}
      />
    )
  }
}
