import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import navigationService from '../../utilities/navigationService'
import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import alertErrors from '../../utilities/alertErrors'

import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedTextArea } from '../../components/UI/Inputs'
import { Container, Section } from '../../components/UI/Layout'
import { dismissAllAlerts } from '../../components/Alerts'
import withLoadingAndErrors from '../../components/WithLoadingAndErrors'

class EditAccountBioScreen extends React.Component {
  static isAbleToListen = false

  constructor(props) {
    super(props)

    this.state = {
      bio: '',
    }
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

    const { bio } = this.state
    const variables = { bio }

    this.props
      .mutate({ variables })

      .then(() => {
        navigationService.back()
      })

      .catch(alertErrors)
  }

  onChangeText = key => (value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { bio } = this.state

    return (
      <Container>
        <Section space={5}>
          <Fieldset>
            <StackedTextArea
              placeholder="Bio"
              value={bio}
              onChangeText={this.onChangeText('bio')}
              autoCorrect={false}
              autoFocus
            />
          </Fieldset>
        </Section>
      </Container>
    )
  }
}

EditAccountBioScreen.propTypes = {
  data: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
}

const editAccountBioQuery = gql`
  query editAccountBioQuery {
    me {
      id
      bio
    }
  }
`

const updateAccountBioMutation = gql`
  mutation updateAccountBioMutation($bio: String){
    update_account(input: { bio: $bio }) {
      clientMutationId
      me {
        id
        bio
      }
    }
  }
`

const DecoratedEditAccountBioScreen = withLoadingAndErrors(EditAccountBioScreen, {
  errorMessage: 'Error getting your settings',
})

const EditAccountBioScreenWithData = compose(
  graphql(editAccountBioQuery),
  graphql(updateAccountBioMutation),
)(DecoratedEditAccountBioScreen)

export default EditAccountBioScreenWithData
