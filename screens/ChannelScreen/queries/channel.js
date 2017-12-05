import gql from 'graphql-tag'

import ChannelHeader from '../components/ChannelHeader'
import blockModalMenuChannelFragment from '../../../components/BlockModalMenu/fragments/blockModalMenuChannel'

export default gql`
  query ChannelQuery($id: ID!) {
    channel(id: $id) {
      __typename
      id
      title
      description(format: MARKDOWN)
      counts {
        blocks
        channels
        connections
      }
      can {
        add_to
      }
      ...ChannelHeader
      ...BlockModalMenuChannel
    }
  }
  ${ChannelHeader.fragments.channelHeader}
  ${blockModalMenuChannelFragment}
`
