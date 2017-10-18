import React from 'react'
import gql from 'graphql-tag'
import { pickBy } from 'lodash'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import navigationService from '../../utilities/navigationService'
import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedInput } from '../../components/UI/Inputs'
import { Container, Section } from '../../components/UI/Layout'
import withLoadingAndErrors from '../../components/WithLoadingAndErrors'

const refetchAccountNameQuery = gql`
  query refetchAccountNameQuery($id: ID!) {
    me {
      id
      name
    }

    user(id: $id) {
      id
      name
    }
  }
`

class EditAccountNameScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: null,
      last_name: null,
    }
  }

  componentDidUpdate() {
    const { navigation } = this.props
    const { first_name, last_name } = this.state

    // TODO: Extract into a function
    if (first_name || last_name) {
      return navigation.setOptions({
        headerRight: (
          <HeaderRightButton
            onPress={this.onSubmit}
            text="Done"
          />
        ),
      })
    }

    navigation.setOptions({ headerRight: null })
  }

  onSubmit = () => {
    const { data: { me: { id } } } = this.props
    const { first_name, last_name } = this.state

    this.props
      .mutate({
        variables: pickBy({
          first_name,
          last_name,
        }),
        // We update the `first_name` and `last_name` here
        // but elsewhere reference `name`
        refetchQueries: [{
          variables: { id },
          query: refetchAccountNameQuery,
        }],
      })
      .then(({ error }) => {
        // TODO: Display error (Implement generic error alert dispatch)
        if (error) console.log(error)

        if (!error) navigationService.back()
      })
  }

  onChangeText = key => (value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { data: { me } } = this.props
    const { first_name, last_name } = this.state

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section>
            <Fieldset>
              <StackedInput
                label="First"
                placeholder="First Name"
                value={first_name || me.first_name}
                onChangeText={this.onChangeText('first_name')}
                autoCorrect={false}
                autoFocus
              />

              <StackedInput
                label="Last"
                placeholder="Last Name"
                value={last_name || me.last_name}
                onChangeText={this.onChangeText('last_name')}
                autoCorrect={false}
              />
            </Fieldset>
          </Section>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

EditAccountNameScreen.propTypes = {
  data: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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
