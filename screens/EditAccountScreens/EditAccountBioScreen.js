import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'

import navigationService from '../../utilities/navigationService'
import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'
import alertErrors from '../../utilities/alertErrors'

import HeaderRightButton from '../../components/HeaderRightButton'
import { Fieldset, StackedTextArea, InputDescription } from '../../components/UI/Inputs'
import { Section } from '../../components/UI/Layout'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import { dismissAllAlerts } from '../../components/Alerts'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

import editAccountBioFragment from './fragments/editAccountBio'
import updateAccountBioMutation from './mutations/updateAccountBio'

class EditAccountBioScreen extends React.Component {
  static propTypes = {
    me: propType(editAccountBioFragment).isRequired,
    updateAccountBio: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { me: { bio } } = this.props

    this.state = {
      bio,
    }
  }

  componentDidUpdate() {
    const { me: { bio } } = this.props

    injectButtonWhenDiff({
      state: this.state,
      fields: { bio },
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text="Done"
      />,
    })
  }

  onSubmit = () => {
    dismissAllAlerts()

    const { me: { id }, updateAccountBio } = this.props
    const { bio } = this.state
    const variables = { bio }

    updateAccountBio({
      variables,
      refetchQueries: [{
        variables: { id },
        query: gql`
          {
            user(id: ${id}) {
              id
              bio(format: HTML)
            }
          }
        `,
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

          <InputDescription>
             Markdown is OK
          </InputDescription>
        </Section>
      </Container>
    )
  }
}

const DecoratedEditAccountBioScreen = withLoadingAndErrors(EditAccountBioScreen, {
  errorMessage: 'Error getting your settings',
})

export default graphql(updateAccountBioMutation, {
  name: 'updateAccountBio',
})(DecoratedEditAccountBioScreen)
