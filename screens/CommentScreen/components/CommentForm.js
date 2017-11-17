import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Comment from '../../../components/Comment'
import { BlockCommentsQuery } from '../../BlockScreen/components/BlockComments'
import { BlockQuery } from '../../BlockScreen/components/BlockContents'
import { Border, Colors, Typography, Units } from '../../../constants/Style'

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  border-top-width: ${Border.borderWidth};
  border-top-color: ${Border.borderColor};
`

const Input = styled.TextInput`
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[2]};
  flex-basis: 80%;
`

const Submit = styled.TouchableOpacity`
  flex-basis: 20%;
  align-items: center;
  alin-content; center;
  justify-content: center;
`

const SubmitLabel = styled.Text`
  font-size: ${Typography.fontSize.small};
  font-weight: ${Typography.fontWeight.bold};
  color: ${Colors.gray.semiBold};
`

class CommentForm extends React.Component {
  componentWillUnmount() {
    Keyboard.dismiss()
  }

  addComment = () => {
    const { onChangeText, submitComment, body, id } = this.props

    onChangeText('')

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
      <Container>
        <Input
          autoFocus
          returnKeyType="send"
          onSubmitEditing={this.addComment}
          onChangeText={onChangeText}
          value={body}
        />
        <Submit onPress={this.addComment}>
          <SubmitLabel>Post</SubmitLabel>
        </Submit>
      </Container>
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

