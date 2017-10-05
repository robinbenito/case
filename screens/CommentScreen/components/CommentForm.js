import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Comment from '../../../components/Comment'
import { BlockCommentsQuery } from '../../BlockScreen/components/BlockComments'
import { BlockQuery } from '../../BlockScreen/components/BlockContents'
import { Units, Border } from '../../../constants/Style'

const Input = styled.TextInput`
  border-top-width: ${Border.borderWidth};
  border-top-color: ${Border.borderColor};
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[2]};
`

class CommentForm extends React.Component {
  componentWillUnmount() {
    Keyboard.dismiss()
  }

  addComment = () => {
    const { onChangeText, submitComment, body, id } = this.props

    submitComment({
      variables: {
        body,
        block_id: id,
      },
      refetchQueries: [
        {
          query: BlockCommentsQuery,
          variables: {
            id,
          },
        },
        {
          query: BlockQuery,
          variables: {
            id,
          },
        },
      ],
    }).then(() => {
      onChangeText('')

      Keyboard.dismiss()

      // TODO: Does not appear to work
      this.props.scrollToEndOfComments()
    })
  }

  render() {
    const { onChangeText, body } = this.props

    return (
      <Input
        autoFocus
        returnKeyType="send"
        onSubmitEditing={this.addComment}
        onChangeText={onChangeText}
        value={body}
        ref={ref => this.Input = ref}
      />
    )
  }
}

CommentForm.propTypes = {
  id: PropTypes.any.isRequired,
  body: PropTypes.string.isRequired,
  submitComment: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  scrollToEndOfComments: PropTypes.func.isRequired,
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

