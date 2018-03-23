import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import StatusBarAwareContainer from '../../components/UI/Layout/StatusBarAwareContainer'
import SearchHeader from '../../components/SearchHeader'
import SearchContents from '../../components/SearchContents'
import CollaboratorsForm from '../../components/Form/CollaboratorsForm'

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

  addCollaborator = ({ __typename, id }) => {
    const {
      mutate,
      navigation: { state: { params: { channel_id } } },
    } = this.props

    return mutate({
      variables: {
        channel_id,
        member_id: id,
        memmber_type: __typename.toUpperCase(),
      },
      refetchQueries: [{
        query: gql`
          {
            channel(id: ${channel_id}) {
              id
              collaborators: members {
                ...CollaboratorsFormCollaborator
              }
            }
          }
          ${CollaboratorsForm.fragments.collaborator}
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

const AddChannelMember = gql`
  mutation addChannelMemberMutation($channel_id: ID!, $member_id: ID!, $member_type: MemberTypes) {
    add_channel_members(input: { id: $channel_id, members: [{ id: $member_id, type: $member_type }] }) {
      channel {
        collaborators {
          id
          name
        }
      }
    }
  }
`

export default graphql(AddChannelMember)(AddCollaboratorsScreen)
