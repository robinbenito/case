import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import { graphql } from 'react-apollo'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

import { Fieldset } from '../../components/UI/Inputs'
import { StackedToggle } from '../../components/UI/Buttons'
import { Section } from '../../components/UI/Layout'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import { dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

import editEmailNotificationsFragment from './fragments/editEmailNotifications'
import updateEmailNotificationsMutation from './mutations/updateEmailNotifications'

class EditEmailNotificationsScreen extends Component {
  static propTypes = {
    me: propType(editEmailNotificationsFragment).isRequired,
    updateEmailNotifications: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { me: { settings: { receive_email } } } = this.props

    this.state = {
      receive_email,
    }
  }

  onPress = value => () => {
    dismissAllAlerts()

    const { updateEmailNotifications } = this.props
    const variables = { receive_email: value }

    this.setState(variables)

    updateEmailNotifications({ variables })
      .then(() => {
        navigationService.back()
      })

      .catch(alertErrors)
  }

  isActive = setting =>
    this.state.receive_email === setting

  render() {
    // TODO: Can I return the contents of an Enum for rendering?
    return (
      <HeaderAwareContainer>
        <Section space={5}>
          <Fieldset>
            <StackedToggle
              active={this.isActive('digest')}
              onPress={this.onPress('digest')}
            >
              Periodic email digest
            </StackedToggle>

            <StackedToggle
              active={this.isActive('notifications')}
              onPress={this.onPress('notifications')}
            >
              One email per notification
            </StackedToggle>

            <StackedToggle
              active={this.isActive('none')}
              onPress={this.onPress('none')}
            >
              None
            </StackedToggle>
          </Fieldset>
        </Section>
      </HeaderAwareContainer>
    )
  }
}

const DecoratedEditEmailNotificationsScreen = withLoadingAndErrors(EditEmailNotificationsScreen, {
  errorMessage: 'Error getting your settings',
})

export default graphql(updateEmailNotificationsMutation, {
  name: 'updateEmailNotifications',
})(DecoratedEditEmailNotificationsScreen)
