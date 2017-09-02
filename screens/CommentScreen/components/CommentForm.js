import React from 'react'
import PropTypes from 'prop-types'

import {
  Keyboard,
  StyleSheet,
  TextInput,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Comment from '../../../components/Comment'
import { BlockCommentsQuery } from '../../BlockScreen/components/BlockComments'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'
import typesizes from '../../../constants/Type'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    fontSize: typesizes.sizes.medium,
    left: 0,
    right: 0,
    bottom: 0,
    padding: layout.padding,
    borderWidth: 1,
    borderColor: colors.gray.border,
    marginTop: 4,
  },
})


class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this)
    this.addComment = this.addComment.bind(this)
  }

  componentWillUnmount() {
    Keyboard.dismiss()
  }

  onFieldChange(value) {
    this.setState({ body: value })
  }

  addComment() {
    const { submitComment, id } = this.props
    submitComment({
      variables: {
        body: this.state.body,
        block_id: id,
      },
      refetchQueries: [
        {
          query: BlockCommentsQuery,
          variables: {
            id,
          },
        },
      ],
    }).then(() => {
      Keyboard.dismiss()
      this.setState({
        body: '',
      })
    })
  }

  render() {
    return (
      <TextInput
        autoFocus
        style={styles.input}
        returnKeyType="send"
        onSubmitEditing={this.addComment}
        onChangeText={this.onFieldChange}
        value={this.state.body}
      />
    )
  }
}

CommentForm.propTypes = {
  id: PropTypes.any.isRequired,
  submitComment: PropTypes.func.isRequired,
}

const CommentMutation = gql`
  mutation CommentMutation($block_id: ID!, $body: String!){
    create_comment(input: { block_id: $block_id, body: $body }) {
      comment {
        ...CommentItem
      }
    }
  }
  ${Comment.fragments.comment}
`

const CommentFormWithMutation = graphql(CommentMutation, { name: 'submitComment' })(CommentForm)

export default CommentFormWithMutation

