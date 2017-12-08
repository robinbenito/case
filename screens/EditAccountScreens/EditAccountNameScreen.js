import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'

import navigationService from '../../utilities/navigationService'
import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import alertErrors from '../../utilities/alertErrors'

import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedInput } from '../../components/UI/Inputs'
import { Container, Section } from '../../components/UI/Layout'
import { dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

import refetchAccountNameQuery from './queries/refetchAccountName'
import editAccountNameFragment from './fragments/editAccountName'
import updateAccountNameMutation from './mutations/updateAccountName'

class EditAccountNameScreen extends Component {
  static fragment = editAccountNameFragment

  static propTypes = {
    me: propType(editAccountNameFragment).isRequired,
    updateAccountName: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { me: { first_name, last_name } } = this.props

    this.state = {
      first_name,
      last_name,
    }
  }

  componentDidUpdate() {
    const { me: { first_name, last_name } } = this.props

    injectButtonWhenDiff({
      state: this.state,
      fields: { first_name, last_name },
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text="Done"
      />,
    })
  }

  onSubmit = () => {
    dismissAllAlerts()

    const { me: { id }, updateAccountName } = this.props
    const { first_name, last_name } = this.state
    const variables = { first_name, last_name }

    updateAccountName({
      variables,

      // We update the `first_name` and `last_name` here
      // but elsewhere reference `name`
      refetchQueries: [{
        variables: { id },
        query: refetchAccountNameQuery,
      }],
    })

    .then(() => {
      navigationService.back()
    })

    .catch(alertErrors)
  }

  onChangeText = key => (value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { first_name, last_name } = this.state

    return (
      <Container>
        <Section space={5}>
          <Fieldset>
            <StackedInput
              label="First"
              placeholder="First Name"
              value={first_name}
              onChangeText={this.onChangeText('first_name')}
              autoCorrect={false}
              autoFocus
            />

            <StackedInput
              label="Last"
              placeholder="Last Name"
              value={last_name}
              onChangeText={this.onChangeText('last_name')}
              autoCorrect={false}
            />
          </Fieldset>
        </Section>
      </Container>
    )
  }
}

const DecoratedEditAccountNameScreen = withLoadingAndErrors(EditAccountNameScreen, {
  errorMessage: 'Error getting your settings',
})

export default graphql(updateAccountNameMutation, {
  name: 'updateAccountName',
})(DecoratedEditAccountNameScreen)
