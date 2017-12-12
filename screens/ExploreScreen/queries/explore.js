import gql from 'graphql-tag'

import blockItemFragment from '../../../components/BlockItem/fragments/blockItem'
import ChannelItem from '../../../components/ChannelItem'

export default gql`
  query ExploreContentsQuery($page: Int!, $type: SearchType) {
    contents: explore(per: 10, page: $page, sort_by: UPDATED_AT, direction: DESC, type: $type) {
      __typename
      ... on Channel {
        ...ChannelThumb
      }
      ... on Connectable {
        ...BlockThumb
      }
    }
  }
  ${blockItemFragment}
  ${ChannelItem.fragments.channel}
`
