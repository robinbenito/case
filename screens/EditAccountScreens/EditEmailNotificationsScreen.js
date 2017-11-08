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

class EditEmailNotificationsScreen extends React.Component {
  static isAbleToListen = false

  static propTypes = {
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      receive_email: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading) return

    this.setState({ ...nextProps.data.me.settings })
  }

  onPress = value => () => {
    dismissAllAlerts()

    const variables = { receive_email: value }

    this.setState(variables)

    this.props
      .mutate({ variables })

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
      <Container>
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
      </Container>
    )
  }
}

const editEmailNotificationsQuery = gql`
  query editEmailNotificationsQuery {
    me {
      settings {
        receive_email
      }
    }
  }
`

const updateEmailNotificationsMutation = gql`
  mutation updateAccountEmailNotificationsMutation($receive_email: String){
    update_account(input: { receive_email: $receive_email }) {
      clientMutationId
      me {
        id
        settings {
          receive_email
        }
      }
    }
  }
`

const DecoratedEditEmailNotificationsScreen = withLoadingAndErrors(EditEmailNotificationsScreen, {
  errorMessage: 'Error getting your settings',
})

const EditEmailNotificationsScreenWithData = compose(
  graphql(editEmailNotificationsQuery),
  graphql(updateEmailNotificationsMutation),
)(DecoratedEditEmailNotificationsScreen)

export default EditEmailNotificationsScreenWithData
