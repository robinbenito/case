import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { gql, graphql } from 'react-apollo'

import HeaderRightButton from '../../HeaderRightButton'
import { Section, Container } from '../../UI/Layout'
import { StackedJumpButton, StackedSwipeable } from '../../UI/Buttons'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../../UI/Inputs'

import navigationService from '../../../utilities/navigationService'
import injectButtonWhenDiff from '../../../utilities/injectButtonWhenDiff'
import { capitalize } from '../../../utilities/inflections'
import alertErrors from '../../../utilities/alertErrors'

class ChannelForm extends React.Component {
  static isAbleToListen = false

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      visibility: 'CLOSED',
      collaborators: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.channel })

    this.isAbleToListen = true
  }

  componentDidUpdate() {
    if (!this.isAbleToListen) return

    injectButtonWhenDiff({
      navigation: this.props.navigation,
      state: this.state,
      fields: this.props.channel,
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

  removeCollaborator = id => () => {
    const { mutate, channel: { id: channel_id } } = this.props

    return mutate({
      variables: {
        channel_id,
        user_ids: [id],
      },
    })

    .catch(alertErrors)
  }

  goToChannelVisibilityScreen = () => {
    const { visibility } = this.state

    navigationService.navigate('channelVisibility', {
      visibility,
      onVisibilityChange: this.onVisibilityChange,
    })
  }

  goToAddCollaboratorsScreen = () => {
    const { channel: { id } } = this.props

    navigationService.navigate('addCollaborators', {
      channel_id: id,
    })
  }

  render() {
    const { channel } = this.props
    const { title, description, visibility } = this.state

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section space={4}>
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

          <Section>
            <Fieldset>
              <StackedJumpButton label="Privacy" onPress={this.goToChannelVisibilityScreen}>
                {capitalize(visibility.toLowerCase())}
              </StackedJumpButton>
            </Fieldset>
          </Section>

          {channel.collaborators &&
            <Section space={4}>
              <FieldsetLabel>
                Collaborators
              </FieldsetLabel>

              <Fieldset>
                <StackedJumpButton
                  onPress={this.goToAddCollaboratorsScreen}
                >
                  + Add collaborators
                </StackedJumpButton>

                {channel.collaborators.length > 0 &&
                  channel.collaborators.map(collaborator => (
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
            </Section>
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
        id
        name
      }
    }
  `,
}

ChannelForm.propTypes = {
  channel: PropTypes.object,
  navigation: PropTypes.object,
  mutate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

ChannelForm.defaultProps = {
  channel: {},
  navigation: {},
}

const RemoveCollaboratorsMutation = gql`
  mutation removeCollaboratorsMutation($user_ids: [ID]!, $channel_id: ID!){
    remove_collaborators(input: { user_ids: $user_ids, channel_id: $channel_id }) {
      channel {
        ...ChannelForm
      }
    }
  }
  ${ChannelForm.fragments.channelForm}
`

export default graphql(RemoveCollaboratorsMutation)(ChannelForm)
