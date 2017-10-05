import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import BlockComments from '../BlockScreen/components/BlockComments'
import CommentForm from './components/CommentForm'
import { Container } from '../../components/UI/Layout'

export default class CommentScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      body: '',
    }
  }

  componentDidMount() {
    this.scrollToEndOfComments()
  }

  onChangeText = (body) => {
    this.setState({ body })
  }

  // TODO: This does not appear to work correctly.
  scrollToEndOfComments = () => {
    this.Comments.scrollToEnd()
  }

  render() {
    const { id } = this.props.navigation.state.params

    return (
      <Container>
        <ScrollView
          ref={ref => this.Comments = ref}
        >
          <BlockComments
            id={id}
            isTypingComment={this.state.body !== ''}
            isLeavingComment
          />
        </ScrollView>

        <CommentForm
          id={id}
          body={this.state.body}
          onChangeText={this.onChangeText}
          scrollToEndOfComments={this.scrollToEndOfComments}
        />

        <KeyboardSpacer />
      </Container>
    )
  }
}

CommentScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
