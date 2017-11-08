import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

import { Fieldset } from '../../components/UI/Inputs'
import { StackedToggle } from '../../components/UI/Buttons'
import { Container, Section } from '../../components/UI/Layout'
import { dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class EditAccountReceiveNewsletterScreen extends React.Component {
  static isAbleToListen = false

  static propTypes = {
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      receive_newsletter: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading) return

    this.setState({ ...nextProps.data.me.settings })
  }

  onPress = value => () => {
    dismissAllAlerts()

    const variables = { receive_newsletter: value }

    this.setState(variables)

    this.props
      .mutate({ variables })

      .then(() => {
        navigationService.back()
      })

      .catch(alertErrors)
  }

  isActive = setting =>
    this.state.receive_newsletter === setting

  render() {
    return (
      <Container>
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
      </Container>
    )
  }
}

const editAccountReceiveNewsletterQuery = gql`
  query editAccountReceiveNewsletterQuery {
    me {
      settings {
        receive_newsletter
      }
    }
  }
`

const updateAccountReceiveNewsletterMutation = gql`
  mutation updateAccountAccountReceiveNewsletterMutation($receive_newsletter: Boolean){
    update_account(input: { receive_newsletter: $receive_newsletter }) {
      clientMutationId
      me {
        id
        settings {
          receive_newsletter
        }
      }
    }
  }
`

const DecoratedEditAccountReceiveNewsletterScreen =
  withLoadingAndErrors(EditAccountReceiveNewsletterScreen, {
    errorMessage: 'Error getting your settings',
  })

const EditAccountReceiveNewsletterScreenWithData = compose(
  graphql(editAccountReceiveNewsletterQuery),
  graphql(updateAccountReceiveNewsletterMutation),
)(DecoratedEditAccountReceiveNewsletterScreen)

export default EditAccountReceiveNewsletterScreenWithData
