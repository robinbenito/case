import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import BackButton from '../../../components/BackButton'
import ChannelForm from '../../../components/Form/ChannelForm'
import { ChannelQuery } from '../../ChannelScreen/components/ChannelContainer'

import navigationService from '../../../utilities/navigationService'
import alertErrors from '../../../utilities/alertErrors'

const NAVIGATION_OPTIONS = {
  title: 'Edit Channel',
  headerLeft: <BackButton />,
}

class EditChannelScreen extends React.Component {
  static navigationOptions() {
    return NAVIGATION_OPTIONS
  }

  onSubmit = ({ visibility, ...rest }) => {
    const { channel: { id }, editChannel } = this.props

    editChannel({
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
      <ChannelForm
        id={channel.id}
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={NAVIGATION_OPTIONS}
        submitText="Save"
      />
    )
  }
}

EditChannelScreen.propTypes = {
  channel: PropTypes.any.isRequired,
  navigation: PropTypes.any,
  editChannel: PropTypes.any.isRequired,
}

EditChannelScreen.defaultProps = {
  navigation: {},
}

const updateChannelMutation = gql`
  mutation updateChannelMutation($id: ID!, $title: String!, $description: String, $visibility: ChannelVisibility){
    update_channel(input: { id: $id, title: $title, description: $description, visibility: $visibility }) {
      clientMutationId
      channel {
        id
        title
        visibility
      }
    }
  }
`

const EditChannelScreenWithData = graphql(updateChannelMutation, { name: 'editChannel' })(EditChannelScreen)

export default EditChannelScreenWithData
