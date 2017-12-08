import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

import { Fieldset } from '../../components/UI/Inputs'
import { StackedToggle } from '../../components/UI/Buttons'
import { Section } from '../../components/UI/Layout'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import { dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

import editAccountReceiveNewsletterFragment from './fragments/editAccountReceiveNewsletter'
import updateAccountReceiveNewsletterMutation from './mutations/updateAccountReceiveNewsletter'

class EditAccountReceiveNewsletterScreen extends React.Component {
  static propTypes = {
    me: propType(editAccountReceiveNewsletterFragment).isRequired,
    updateAccountReceiveNewsletter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { me: { settings: { receive_newsletter } } } = this.props

    this.state = {
      receive_newsletter,
    }
  }

  onPress = value => () => {
    dismissAllAlerts()

    const { updateAccountReceiveNewsletter } = this.props
    const variables = { receive_newsletter: value }

    this.setState(variables)

    updateAccountReceiveNewsletter({ variables })
      .then(() => {
        navigationService.back()
      })

      .catch(alertErrors)
  }

  isActive = setting =>
    this.state.receive_newsletter === setting

  render() {
    return (
      <HeaderAwareContainer>
        <Section space={5}>
          <Fieldset>
            <StackedToggle
              active={this.isActive(true)}
              onPress={this.onPress(true)}
            >
              Subscribed
            </StackedToggle>

            <StackedToggle
              active={this.isActive(false)}
              onPress={this.onPress(false)}
            >
              Unsubscribed
            </StackedToggle>
          </Fieldset>
        </Section>
      </HeaderAwareContainer>
    )
  }
}

const DecoratedEditAccountReceiveNewsletterScreen =
  withLoadingAndErrors(EditAccountReceiveNewsletterScreen, {
    errorMessage: 'Error getting your settings',
  })

export default graphql(updateAccountReceiveNewsletterMutation, {
  name: 'updateAccountReceiveNewsletter',
})(DecoratedEditAccountReceiveNewsletterScreen)

