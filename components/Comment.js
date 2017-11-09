import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'
import UserAvatar from './UserAvatar'
import UserNameText from './UserNameText'
import { Typography, Units, Colors } from '../constants/Style'
import { BaseIcon } from './UI/Icons'

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${Units.base};
`

const Avatar = styled.View`
  flex-basis: 12.5%;
  margin-top: ${Units.scale[2]};
  margin-right: ${Units.scale[1]};
`

const Content = styled.View`
  flex-basis: 87.5%;
`

const Username = styled(UserNameText)`
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base')};
  font-weight: ${Typography.fontWeight.semiBold};
  color: ${Colors.semantic.text};
`

const Body = styled.Text`
  color: ${Colors.semantic.text};
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base', 'compact')};
  padding-right: ${Units.base};
`

const Timestamp = styled.Text`
  margin-top: ${Units.scale[1]};
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.tiny};
  line-height: ${Typography.lineHeightFor('tiny', 'compact')};
`

class PendingComment extends Component {
  render() {
    const { data: { loading, error, user } } = this.props

    if (loading || error) return <View />

    return (
      <Container>
        <Avatar>
          <UserAvatar user={user} size={30} />
        </Avatar>

        <Content>
          <Body>
            <BaseIcon name="ios-more" />
          </Body>
        </Content>
      </Container>
    )
  }
}

const UserForPendingComment = gql`
  query UserForPendingComment {
    user: me {
      id
      ...Avatar
    }
  }
  ${UserAvatar.fragments.avatar}
`

export const PendingCommentWithData = graphql(UserForPendingComment)(PendingComment)

PendingComment.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object,
  }).isRequired,
}

const Comment = ({ comment: { user, body, updated_at } }) => (
  <Container>
    <Avatar>
      <UserAvatar user={user} size={30} />
    </Avatar>

    <Content>
      <Username user={user} />

      <Body>
        {body}
      </Body>

      <Timestamp>
        {updated_at.toUpperCase()}
      </Timestamp>
    </Content>
  </Container>
)

Comment.fragments = {
  comment: gql`
    fragment CommentItem on Comment {
      __typename
      id
      body
      updated_at(relative: true)
      user {
        __typename
        id
        name
        slug
        ...Avatar
      }
    }
    ${UserAvatar.fragments.avatar}
  `,
}

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      initials: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Comment
