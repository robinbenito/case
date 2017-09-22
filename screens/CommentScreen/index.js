import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import BlockComments from '../BlockScreen/components/BlockComments'
import CommentForm from './components/CommentForm'
import { Container } from '../../components/UI/Layout'

export default class CommentScreen extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params
    return (
      <Container>
        <ScrollView>
          <BlockComments id={id} />
        </ScrollView>
        <CommentForm id={id} />
        <KeyboardSpacer />
      </Container>
    )
  }
}

CommentScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
