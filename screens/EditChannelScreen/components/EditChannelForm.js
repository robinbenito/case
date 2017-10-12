import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import BackButton from '../../../components/BackButton'
import ChannelForm from '../../../components/ChannelForm'
import { ChannelQuery } from '../../ChannelScreen/components/ChannelContainer'

import NavigatorService from '../../../utilities/navigationService'

import { Colors } from '../../../constants/Style'

const navigationOptions = {
  title: 'Edit Channel',
  headerLeft: (<BackButton />),
}

class EditChannelScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  onSubmit = (variables) => {
    const { channel, editChannel } = this.props
    editChannel({
      variables: {
        ...variables,
        id: channel.id,
        visibility: variables.visibility.toUpperCase(),
      },
      refetchQueries: [
        {
          query: ChannelQuery,
          variables: {
            id: channel.id,
          },
        },
      ],
    }).then((response) => {
      const { data } = response
      if (!data.error) {
        NavigatorService.back()
      }
    })
  }

  render() {
    const { navigation, channel } = this.props
    return (
      <ChannelForm
        channel={channel}
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={navigationOptions}
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
  navigation: () => null,
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
