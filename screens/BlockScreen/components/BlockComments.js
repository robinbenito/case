import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator, FlatList } from 'react-native'
import Empty from '../../../components/Empty'
import Comment, { PendingCommentWithData } from '../../../components/Comment'
import { Units } from '../../../constants/Style'
import { Button, ButtonLabel } from '../../../components/UI/Buttons'
import { CenterColumn } from '../../../components/UI/Layout'
import navigationService from '../../../utilities/navigationService'

const Submit = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

const Comments = styled.View`
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[2]};
`

class BlockComments extends React.Component {
  leaveComment = (block) => {
    navigationService.navigate('comment', {
      id: block.id,
      title: block.title,
    })
  }

  renderLoader = () => {
    if (!this.props.data.loading) return null

    return (
      <ActivityIndicator
        size="small"
        animating
      />
    )
  }

  render() {
    const {
      data, data: { loading, error, networkStatus },
      isLeavingComment,
      isTypingComment,
    } = this.props

    if (error) {
      return (
        <Submit>
          <Empty>
            Error loading comments
          </Empty>
        </Submit>
      )
    }

    if (loading) {
      return (
        <Submit>
          <ActivityIndicator />
        </Submit>
      )
    }

    const { block, block: { comments } } = data

    const leaveCommentButton = (!isLeavingComment &&
      <Button space={1} onPress={() => this.leaveComment(block)}>
        <ButtonLabel>Leave&nbsp;comment</ButtonLabel>
      </Button>
    )

    if (comments.length === 0) {
      return (
        <Comments>
          {isTypingComment &&
            <PendingCommentWithData />
          }

          <Submit>
            {leaveCommentButton}
          </Submit>
        </Comments>
      )
    }

    return (
      <Comments>
        <FlatList
          data={comments}
          refreshing={networkStatus === 4}
          keyExtractor={item => item.id}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.9}
          ListFooterComponent={this.renderLoader}
          renderItem={({ item }) => (
            <Comment comment={item} />
          )}
        />

        {isTypingComment &&
          <PendingCommentWithData />
        }

        <Submit>
          {leaveCommentButton}
        </Submit>
      </Comments>
    )
  }
}

BlockComments.propTypes = {
  data: PropTypes.any.isRequired,
  isLeavingComment: PropTypes.bool.isRequired,
  isTypingComment: PropTypes.bool.isRequired,
}

BlockComments.defaultProps = {
  isLeavingComment: false,
  isTypingComment: false,
}

export const BlockCommentsQuery = gql`
  query BlockCommentsQuery($id: ID!){
    block(id: $id) {
      __typename
      id
      comments {
        ...CommentItem
      }
    }
  }
  ${Comment.fragments.comment}
`

const BlockCommentsWithData = graphql(BlockCommentsQuery)(BlockComments)

export default BlockCommentsWithData
