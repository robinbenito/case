import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Store from '../../state/Store'
import { TOGGLE_ADD_MENU } from '../../state/actions'

import BackButton from '../../components/BackButton'
import ChannelForm from '../../components/Form/ChannelForm'

import NavigatorService from '../../utilities/navigationService'

import { Colors } from '../../constants/Style'

const navigationOptions = {
  title: 'New Channel',
  headerLeft: (<BackButton />),
}

class NewChannelScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  onSubmit = (variables) => {
    this.props.mutate({ variables }).then((response) => {
      const { data } = response
      if (!data.error) {
        const { create_channel: { channel: { id, title, visibility } } } = data
        Store.dispatch({ type: TOGGLE_ADD_MENU })
        NavigatorService.navigate('channel', { id, title, color: Colors.channel[visibility] })
      }
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <ChannelForm
        onSubmit={this.onSubmit}
        navigation={navigation}
        navigationOptions={navigationOptions}
      />
    )
  }
}

NewChannelScreen.propTypes = {
  navigation: PropTypes.any,
  mutate: PropTypes.any.isRequired,
}

NewChannelScreen.defaultProps = {
  navigation: () => null,
}

const createChannelMutation = gql`
  mutation createChannelMutation($title: String!, $description: String, $visibility: ChannelVisibility){
    create_channel(input: { title: $title, description: $description, visibility: $visibility }) {
      clientMutationId
      channel {
        id
        title
        visibility
      }
    }
  }
`

const NewChannelScreenWithData = graphql(createChannelMutation)(NewChannelScreen)

export default NewChannelScreenWithData
