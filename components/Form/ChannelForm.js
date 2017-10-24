import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import NavigatorService from '../../utilities/navigationService'
import { Section, Container } from '../../components/UI/Layout'
import { StackedJumpButton } from '../../components/UI/Buttons'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../../components/UI/Inputs'
import { capitalize } from '../../utilities/inflections'

class ChannelForm extends React.Component {
  constructor(props) {
    super(props)

    const { title, description, visibility } = props.channel

    this.state = {
      title,
      description,
      visibility,
    }
  }

  componentDidUpdate() {
    // Hide or show the done button depending on if content is present
    if (this.state.title) {
      return this.setNavOptions({
        headerRight: (
          <HeaderRightButton
            onPress={this.onSubmit}
            text={this.props.submitText}
          />
        ),
      })
    }

    this.setNavOptions({ headerRight: null })
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

  setNavOptions(options) {
    this.props.navigation.setOptions({
      ...this.props.navigationOptions,
      ...options,
    })
  }

  goToChannelVisibilityScreen = () => {
    const { visibility } = this.state

    NavigatorService.navigate('channelVisibility', {
      visibility,
      onVisibilityChange: this.onVisibilityChange,
    })
  }

  render() {
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
              />

              <StackedTextArea
                name="description"
                placeholder="Description (optional)"
                value={description}
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
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

ChannelForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  navigation: PropTypes.any,
  navigationOptions: PropTypes.any.isRequired,
  channel: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    visibility: PropTypes.string,
  }),
}

ChannelForm.defaultProps = {
  onSubmit: () => null,
  navigation: {},
  submitText: 'Done',
  channel: {
    title: null,
    description: null,
    visibility: 'CLOSED',
  },
}

export default ChannelForm
