import gql from 'graphql-tag'

import blockItemFragment from '../../../components/BlockItem/fragments/blockItem'
import blockModalMenuBlockFragment from '../../../components/BlockModalMenu/fragments/blockModalMenuBlock'

export default gql`
  query ChannelBlocksQuery($id: ID!, $page: Int!, $type: ConnectableTypeEnum) {
    channel(id: $id) {
      __typename
      id
      counts {
        blocks
        channels
      }
      contents: blocks(per: 10, page: $page, sort_by: POSITION, direction: DESC, type: $type) {
        ...BlockThumb
        ...BlockModalMenuBlock
      }
    }
  }
  ${blockItemFragment}
  ${blockModalMenuBlockFragment}
`
