import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import alertErrors from '../../utilities/alertErrors'

import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedInput } from '../../components/UI/Inputs'
import { Container, Section } from '../../components/UI/Layout'
import { sendAlert, dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class EditAccountEmailScreen extends React.Component {
  static isAbleToListen = false

  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }
  }

  componentDidMount() {
    const { data: { me: { unconfirmed_email } } } = this.props

    if (unconfirmed_email) this.alertChange(unconfirmed_email)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading) return

    this.setState({ ...nextProps.data.me })

    this.isAbleToListen = true
  }

  componentDidUpdate() {
    if (!this.isAbleToListen) return

    injectButtonWhenDiff({
      navigation: this.props.navigation,
      state: this.state,
      fields: this.props.data.me,
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text="Done"
      />,
    })
  }

  onSubmit = () => {
    dismissAllAlerts()

    const { email } = this.state
    const variables = { email }

    this.props
      .mutate({ variables })

      .then(({ data: { update_account: { me: { unconfirmed_email } } } }) => {
        this.alertChange(unconfirmed_email)
      })

      .catch(alertErrors)
  }

  onChangeText = key => (value) => {
    this.setState({ [key]: value })
  }

  alertChange = (unconfirmedEmail) => {
    sendAlert({
      id: 'settings:unconfirmed_email',
      type: 'confirmation',
      children: `Please check your email to confirm ${unconfirmedEmail}`,
    })
  }

  render() {
    const { email } = this.state

    return (
      <Container>
        <Section space={5}>
          <Fieldset>
            <StackedInput
              label="Email"
              placeholder="Email address"
              keyboardType="email-address"
              value={email}
              onChangeText={this.onChangeText('email')}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus
            />
          </Fieldset>
        </Section>
      </Container>
    )
  }
}

EditAccountEmailScreen.propTypes = {
  data: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
}

const editAccountEmailQuery = gql`
  query editAccountEmailQuery {
    me {
      id
      email
      unconfirmed_email
    }
  }
`

const updateAccountEmailMutation = gql`
  mutation updateAccountEmailMutation($email: String){
    update_account(input: { email: $email }) {
      clientMutationId
      me {
        id
        email
        unconfirmed_email
      }
    }
  }
`

const DecoratedEditAccountEmailScreen = withLoadingAndErrors(EditAccountEmailScreen, {
  errorMessage: 'Error getting your settings',
})

const EditAccountEmailScreenWithData = compose(
  graphql(editAccountEmailQuery),
  graphql(updateAccountEmailMutation),
)(DecoratedEditAccountEmailScreen)

export default EditAccountEmailScreenWithData
