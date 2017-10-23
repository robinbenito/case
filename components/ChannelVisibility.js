import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import { Fieldset, InputDescription } from './UI/Inputs'
import { StackedToggle } from './UI/Buttons'
import { Container, Section } from './UI/Layout'

import { Colors } from '../constants/Style'

import navigationService from '../utilities/navigationService'

export default class ChannelVisibilityScreen extends React.Component {
  constructor(props) {
    super(props)

    const {
      visibility,
      onVisibilityChange: onVisibilityChangeUpdate,
    } = props.navigation.state.params

    this.state = { visibility }
    this.onVisibilityChangeUpdate = onVisibilityChangeUpdate
  }

  onPress = (value) => {
    this.setState({ visibility: value })
    this.onVisibilityChangeUpdate(value)
    navigationService.back()
  }

  isActive = visibility =>
    this.state.visibility === visibility

  render() {
    return (
      <Container>
        <Section space={2}>
          <Fieldset>
            <StackedToggle
              active={this.isActive('PUBLIC')}
              onPress={() => this.onPress('PUBLIC')}
            >
              <Text style={{ color: Colors.channel.public }}>
                Open
              </Text>
            </StackedToggle>
          </Fieldset>

          <InputDescription>
            Everyone can view the channel and anyone logged-in can add to it.
          </InputDescription>
        </Section>

        <Section space={2}>
          <Fieldset>
            <StackedToggle
              active={this.isActive('CLOSED')}
              onPress={() => this.onPress('CLOSED')}
            >
              <Text style={{ color: Colors.channel.closed }}>
                Closed
              </Text>
            </StackedToggle>
          </Fieldset>

          <InputDescription>
            Everyone can view the channel but only you and collaborators can add to it.
          </InputDescription>
        </Section>

        <Section space={2}>
          <Fieldset>
            <StackedToggle
              active={this.isActive('PRIVATE')}
              onPress={() => this.onPress('PRIVATE')}
            >
              <Text style={{ color: Colors.channel.private }}>
                Private
              </Text>
            </StackedToggle>
          </Fieldset>

          <InputDescription>
            Only you and collaborators can view and add to the channel.
          </InputDescription>
        </Section>
      </Container>
    )
  }
}

ChannelVisibilityScreen.propTypes = {
  navigation: PropTypes.any,
}

ChannelVisibilityScreen.defaultProps = {
  navigation: () => null,
}
