import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import { Fieldset, InputDescription } from '../../../components/UI/Inputs'
import { StackedToggle } from '../../../components/UI/Buttons'
import { Section } from '../../../components/UI/Layout'
import { Strong } from '../../../components/UI/Texts'

import { Colors } from '../../../constants/Style'

import navigationService from '../../../utilities/navigationService'

const BlockLimitDisclaimer = ({ children, ...rest }) => (
  <View style={{ flex: 1, justifyContent: 'flex-end' }} {...rest}>
    <InputDescription>
      {children}
    </InputDescription>
  </View>
)

BlockLimitDisclaimer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default class ChannelVisibilitySelect extends Component {
  constructor(props) {
    super(props)

    const { visibility } = props

    this.state = { visibility }
  }

  onPress = value => () => {
    this.setState({ visibility: value })
    this.props.onVisibilityChangeUpdate(value)
    navigationService.back()
  }

  isActive = visibility =>
    this.state.visibility === visibility

  render() {
    const { me } = this.props

    return (
      <View style={{ flex: 1 }}>
        <Section space={2}>
          <Fieldset>
            <StackedToggle
              active={this.isActive('PUBLIC')}
              onPress={this.onPress('PUBLIC')}
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
              onPress={this.onPress('CLOSED')}
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

        <Section space={2} fill>
          <Fieldset>
            <StackedToggle
              active={this.isActive('PRIVATE')}
              onPress={this.onPress('PRIVATE')}
              disabled={me.is_exceeding_private_connections_limit}
            >
              <Text
                style={{
                  color: me.is_exceeding_private_connections_limit ?
                    Colors.gray.medium : Colors.channel.private,
                }}
              >
                {me.is_premium ? 'Private' : 'Private*'}
              </Text>
            </StackedToggle>
          </Fieldset>

          <InputDescription>
            {me.is_exceeding_private_connections_limit &&
              <Text>
                <Text>*You have used your 100 private blocks.</Text>
                <Strong>
                  {'\n'}
                  Register for Premium and get unlimited private blocks.
                </Strong>
              </Text>
            }

            {!me.is_exceeding_private_connections_limit &&
              'Only you and collaborators can view and add to the channel.'
            }
          </InputDescription>

          {!me.is_premium && !me.is_exceeding_private_connections_limit &&
            <BlockLimitDisclaimer>
              <Text>
                *You are currently using {me.counts.private_connections} out of {
                  me.counts.private_connections_limit
                } private blocks.
              </Text>
              <Strong>
                {'\n'}
                Register for Premium and get unlimited private blocks.
              </Strong>
            </BlockLimitDisclaimer>
          }
        </Section>
      </View>
    )
  }
}

ChannelVisibilitySelect.fragments = {
  me: gql`
    fragment ChannelVisibilitySelectFragment on Me {
      id
      is_exceeding_private_connections_limit
      is_premium
      counts {
        private_connections
        private_connections_limit
      }
    }
  `,
}

ChannelVisibilitySelect.propTypes = {
  me: propType(ChannelVisibilitySelect.fragments.me).isRequired,
  visibility: PropTypes.string.isRequired,
  onVisibilityChangeUpdate: PropTypes.func.isRequired,
}
