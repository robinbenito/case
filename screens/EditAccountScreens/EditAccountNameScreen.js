import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import navigationService from '../../utilities/navigationService'
import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import alertErrors from '../../utilities/alertErrors'

import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedInput } from '../../components/UI/Inputs'
import { Container, Section } from '../../components/UI/Layout'
import { dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

const refetchAccountNameQuery = gql`
  query refetchAccountNameQuery($id: ID!) {
    me {
      id
      name
      initials
    }

    user(id: $id) {
      id
      name
      initials
    }
  }
`

class EditAccountNameScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading) return

    this.setState({ ...nextProps.data.me })
  }

  componentDidUpdate() {
    const {
      data: {
        me: {
          first_name,
          last_name,
        },
      },
    } = this.props

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

    const { id, first_name, last_name } = this.state
    const variables = { first_name, last_name }

    this.props
      .mutate({
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

EditAccountNameScreen.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
}

const editAccountNameQuery = gql`
  query editAccountNameQuery {
    me {
      id
      first_name
      last_name
    }
  }
`

const updateAccountNameMutation = gql`
  mutation updateAccountNameMutation($first_name: String, $last_name: String){
    update_account(input: { first_name: $first_name, last_name: $last_name }) {
      clientMutationId
      me {
        id
        first_name
        last_name
      }
    }
  }
`

const DecoratedEditAccountNameScreen = withLoadingAndErrors(EditAccountNameScreen, {
  errorMessage: 'Error getting your settings',
})

const EditAccountNameScreenWithData = compose(
  graphql(editAccountNameQuery),
  graphql(updateAccountNameMutation),
)(DecoratedEditAccountNameScreen)

export default EditAccountNameScreenWithData
