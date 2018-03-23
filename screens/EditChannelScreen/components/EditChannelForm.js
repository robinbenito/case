import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ChannelForm from '../../../components/Form/ChannelForm'
import channelQuery from '../../ChannelScreen/queries/channel'

import navigationService from '../../../utilities/navigationService'
import alertErrors from '../../../utilities/alertErrors'

export default class EditChannelForm extends Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    updateChannel: PropTypes.func.isRequired,
    removeChannelMember: PropTypes.func.isRequired,
    deleteChannel: PropTypes.func.isRequired,
  }

  onSubmit = ({ title, description, visibility }) => {
    const { channel: { id }, updateChannel } = this.props

    return updateChannel({
      variables: {
        id,
        title,
        description,
        visibility: visibility.toUpperCase(),
      },

      refetchQueries: [
        {
          query: channelQuery,
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
      removeChannelMember,
      deleteChannel,
    } = this.props

    return (
      <ChannelForm
        channel={channel}
        navigation={navigation}
        onSubmit={this.onSubmit}
        removeChannelMember={removeChannelMember}
        deleteChannel={deleteChannel}
      />
    )
  }
}
