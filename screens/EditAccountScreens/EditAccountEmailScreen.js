import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'

import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import alertErrors from '../../utilities/alertErrors'

import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedInput } from '../../components/UI/Inputs'
import { Section } from '../../components/UI/Layout'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import { sendAlert, dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

import editAccountEmailFragment from './fragments/editAccountEmail'
import updateAccountEmailMutation from './mutations/updateAccountEmail'

class EditAccountEmailScreen extends React.Component {
  static propTypes = {
    me: propType(editAccountEmailFragment).isRequired,
    updateAccountEmail: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { me: { email } } = this.props

    this.state = {
      email,
    }
  }

  componentDidMount() {
    const { me: { unconfirmed_email } } = this.props

    if (unconfirmed_email) this.alertChange(unconfirmed_email)
  }

  componentDidUpdate() {
    const { me: { email } } = this.props

    injectButtonWhenDiff({
      state: this.state,
      fields: { email },
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text="Done"
      />,
    })
  }

  onSubmit = () => {
    dismissAllAlerts()

    const { updateAccountEmail } = this.props
    const { email } = this.state
    const variables = { email }

    updateAccountEmail({ variables })
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
      <HeaderAwareContainer>
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
      </HeaderAwareContainer>
    )
  }
}

const DecoratedEditAccountEmailScreen = withLoadingAndErrors(EditAccountEmailScreen, {
  errorMessage: 'Error getting your settings',
})

export default graphql(updateAccountEmailMutation, {
  name: 'updateAccountEmail',
})(DecoratedEditAccountEmailScreen)
