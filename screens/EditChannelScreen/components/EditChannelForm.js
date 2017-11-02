import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import ChannelFormWithData from '../../../components/Form/ChannelForm'
import ChannelForm from '../../../components/Form/ChannelForm/ChannelForm'
import { ChannelQuery } from '../../ChannelScreen/components/ChannelContainer'

import navigationService from '../../../utilities/navigationService'
import alertErrors from '../../../utilities/alertErrors'

class EditChannelScreen extends Component {
  onSubmit = ({ visibility, ...rest }) => {
    const { channel: { id }, mutate } = this.props

    return mutate({
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
    const { navigation, channel } = this.props

    return (
      <ChannelFormWithData
        id={channel.id}
        navigation={navigation}
        onSubmit={this.onSubmit}
      />
    )
  }
}

EditChannelScreen.propTypes = {
  channel: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
}

EditChannelScreen.defaultProps = {
  channel: {},
  navigation: {},
}

const updateChannelMutation = gql`
  mutation updateChannelMutation($id: ID!, $title: String!, $description: String, $visibility: ChannelVisibility){
    update_channel(input: { id: $id, title: $title, description: $description, visibility: $visibility }) {
      clientMutationId
      channel {
        ...ChannelForm
      }
    }
  }
  ${ChannelForm.fragments.channelForm}
`

export default graphql(updateChannelMutation)(EditChannelScreen)
