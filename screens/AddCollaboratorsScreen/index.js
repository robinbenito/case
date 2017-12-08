import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import StatusBarAwareContainer from '../../components/UI/Layout/StatusBarAwareContainer'
import SearchHeader from '../../components/SearchHeader'
import SearchContents from '../../components/SearchContents'

import alertErrors from '../../utilities/alertErrors'
import navigationService from '../../utilities/navigationService'

class AddCollaboratorsScreen extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: null,
    }
  }

  search = query =>
    this.setState({ query })

  addCollaborator = ({ id }) => {
    const {
      mutate,
      navigation: { state: { params: { channel_id } } },
    } = this.props

    return mutate({
      variables: {
        channel_id,
        user_ids: [id],
      },
      refetchQueries: [{
        query: gql`
          {
            channel(id: ${channel_id}) {
              id
              collaborators {
                id
                name
              }
            }
          }
        `,
      }],

    })

    .then(() =>
      navigationService.back(),
    )

    .catch(alertErrors)
  }

  render() {
    const { query } = this.state

    return (
      <StatusBarAwareContainer>
        <SearchHeader
          onChangeText={this.search}
          autoFocus
        />

        <SearchContents
          q={query}
          type="USER"
          onResultPress={this.addCollaborator}
        />
      </StatusBarAwareContainer>
    )
  }
}

const AddCollaboratorsMutation = gql`
  mutation addCollaboratorsMutation($user_ids: [ID]!, $channel_id: ID!){
    add_collaborators(input: { user_ids: $user_ids, channel_id: $channel_id }) {
      channel {
        collaborators {
          id
          name
        }
      }
    }
  }
`

export default graphql(AddCollaboratorsMutation)(AddCollaboratorsScreen)
