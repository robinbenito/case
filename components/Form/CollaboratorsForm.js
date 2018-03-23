import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { View, Text } from 'react-native'

import { StackedJumpButton, StackedSwipeable } from '../UI/Buttons'
import { FieldsetLabel, Fieldset } from '../UI/Inputs'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

export default class CollaboratorsForm extends Component {
  removeCollaborator = (member_id, member_type) => () => {
    const {
      removeChannelMember,
      channel: {
        id: channel_id,
      },
    } = this.props

    return removeChannelMember({
      variables: {
        channel_id,
        member_id,
        member_type,
      },
    })

    .catch(alertErrors)
  }

  goToAddCollaboratorsScreen = () => {
    const { channel: { id } } = this.props

    navigationService.navigate('addCollaborators', {
      channel_id: id,
    })
  }

  render() {
    const { collaborators } = this.props

    return (
      <View>
        <FieldsetLabel>
          Collaborators
        </FieldsetLabel>

        <Fieldset>
          <StackedJumpButton
            onPress={this.goToAddCollaboratorsScreen}
          >
            + Add collaborators
          </StackedJumpButton>

          {collaborators.length > 0 &&
            collaborators.map(collaborator => (
              <StackedSwipeable
                key={collaborator.id}
                right={[
                  {
                    text: 'Delete',
                    backgroundColor: 'red',
                    color: 'white',
                    onPress: this.removeCollaborator(
                      collaborator.id,
                      collaborator.__typename.toUpperCase(),
                    ),
                  },
                ]}
              >
                {collaborator.name}
                {collaborator.__typename === 'Group' &&
                  <Text>
                    {' '}
                    ({collaborator.users.length + 1} users)
                  </Text>
                }
              </StackedSwipeable>
            ))
          }
        </Fieldset>
      </View>
    )
  }
}

CollaboratorsForm.fragments = {
  collaborator: gql`
    fragment CollaboratorsFormCollaborator on Member {
      __typename
      ... on User {
        id
        name
      }
      ... on Group {
        id
        name
        user {
          id
          name
        }
        users {
          id
          name
        }
      }
    }
  `,
}

CollaboratorsForm.propTypes = {
  removeChannelMember: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  collaborators: PropTypes.arrayOf(propType(CollaboratorsForm.fragments.collaborator)).isRequired,
}
