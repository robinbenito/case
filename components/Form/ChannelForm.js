import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { gql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import { View, Text } from 'react-native'

import HeaderRightButton from '../HeaderRightButton'
import { Section, Container } from '../UI/Layout'
import { StackedButton, StackedJumpButton } from '../UI/Buttons'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'
import CollaboratorsForm from './CollaboratorsForm'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'
import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import { capitalize } from '../../utilities/inflections'

import { Colors } from '../../constants/Style'

class ChannelForm extends Component {
  constructor(props) {
    super(props)

    const {
      channel: {
        title,
        description,
        visibility,
        collaborators,
      },
    } = props

    this.state = {
      title,
      description,
      visibility,
      collaborators,
    }
  }

  componentDidUpdate() {
    const {
      channel: {
        title,
        description,
        visibility,
        collaborators,
      },
    } = this.props

    injectButtonWhenDiff({
      state: this.state,
      fields: {
        title,
        description,
        visibility,
        collaborators,
      },
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text="Done"
      />,
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state)
  }

  onChangeText = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  onVisibilityChange = (value) => {
    this.setState({ visibility: value.toUpperCase() })
  }

  goToChannelVisibilityScreen = () => {
    const { visibility } = this.state

    navigationService.navigate('channelVisibility', {
      visibility: visibility.toUpperCase(),
      onVisibilityChangeUpdate: this.onVisibilityChange,
    })
  }

  deleteChannel = () => {
    const { deleteChannel, channel: { id } } = this.props

    return deleteChannel({ variables: { id } })
    .then(() => navigationService.navigate('profile'))
    .catch(alertErrors)
  }

  render() {
    const { channel, removeCollaborators, mode } = this.props
    const { title, description, visibility } = this.state

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section spaceT={4} spaceB={4}>
            <FieldsetLabel>
              Title / Description
            </FieldsetLabel>

            <Fieldset>
              <StackedInput
                placeholder="Title"
                onChangeText={this.onChangeText('title')}
                value={title}
                autoFocus
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.DescriptionInput.focus()
                }}
              />

              <StackedTextArea
                name="description"
                placeholder="Description (optional)"
                value={description}
                ref={ref => this.DescriptionInput = ref}
                onChangeText={this.onChangeText('description')}
              />
            </Fieldset>
          </Section>

          <Section spaceB={4}>
            <Fieldset>
              <StackedJumpButton label="Privacy" onPress={this.goToChannelVisibilityScreen}>
                {capitalize(visibility.toLowerCase())}
              </StackedJumpButton>
            </Fieldset>
          </Section>

          {mode === 'EDIT' &&
            <View>
              <Section spaceB={4}>
                <CollaboratorsForm
                  channel={channel}
                  collaborators={channel.collaborators}
                  removeCollaborators={removeCollaborators}
                />
              </Section>

              <Section spaceB={4}>
                <Fieldset>
                  <StackedButton onPress={this.deleteChannel}>
                    <Text style={{ color: Colors.state.alert }}>
                      Delete channel
                    </Text>
                  </StackedButton>
                </Fieldset>
              </Section>
            </View>
          }
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

ChannelForm.fragments = {
  channelForm: gql`
    fragment ChannelForm on Channel {
      id
      title
      description
      visibility
      collaborators {
        ...CollaboratorsFormCollaborator
      }
    }
    ${CollaboratorsForm.fragments.collaborator}
  `,
}

ChannelForm.propTypes = {
  mode: PropTypes.oneOf(['NEW', 'EDIT']),
  channel: propType(ChannelForm.fragments.channelForm).isRequired,
  onSubmit: PropTypes.func.isRequired,
  removeCollaborators: PropTypes.func,
  deleteChannel: PropTypes.func,
}

ChannelForm.defaultProps = {
  mode: 'EDIT',
  channel: {
    id: 0,
    title: '',
    description: '',
    visibility: 'CLOSED',
    collaborators: [],
  },
  removeCollaborators: () => {},
  deleteChannel: () => {},
}

export default ChannelForm
