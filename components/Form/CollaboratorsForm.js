import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { View } from 'react-native'

import { StackedJumpButton, StackedSwipeable } from '../UI/Buttons'
import { FieldsetLabel, Fieldset } from '../UI/Inputs'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

export default class CollaboratorsForm extends Component {
  removeCollaborator = id => () => {
    const {
      removeCollaborators,
      channel: {
        id: channel_id,
      },
    } = this.props

    return removeCollaborators({
      variables: {
        channel_id,
        user_ids: [id],
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
                    onPress: this.removeCollaborator(collaborator.id),
                  },
                ]}
              >
                {collaborator.name}
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
    fragment CollaboratorsFormCollaborator on User {
      id
      name
    }
  `,
}

CollaboratorsForm.propTypes = {
  removeCollaborators: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  collaborators: PropTypes.arrayOf(propType(CollaboratorsForm.fragments.collaborator)).isRequired,
}
