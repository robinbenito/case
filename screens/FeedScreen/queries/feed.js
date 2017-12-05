import gql from 'graphql-tag'

import FeedWordLink from '../../../components/FeedWordLink'
import BlockItem from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import UserAvatar from '../../../components/UserAvatar'

export default gql`
  query FeedQuery($offset: Int, $limit: Int){
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit) {
        __typename
        groups {
          __typename
          id: key
          key
          length
          user {
            id
            name
            slug
          }
          is_single
          verb
          object {
            __typename
            ...ChannelWord
            ...ConnectableWord
            ...UserWord
          }
          object_phrase(truncate: 60)
          connector
          target {
            __typename
            ...ChannelWord
            ...ConnectableWord
            ...UserWord
          }
          target_phrase
          created_at(relative: true)
          items {
            __typename
            ... on User {
              id
            }
            ...Avatar
            ...ChannelThumb
            ...BlockThumb
          }
        }
      }
    }
  }
  ${UserAvatar.fragments.avatar}
  ${BlockItem.fragments.block}
  ${ChannelItem.fragments.channel}
  ${FeedWordLink.fragments.channel}
  ${FeedWordLink.fragments.connectable}
  ${FeedWordLink.fragments.user}
`
