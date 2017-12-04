import gql from 'graphql-tag'

import ChannelHeader from '../components/ChannelHeader'
import BlockModalMenu from '../../../components/BlockModalMenu'

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
  ${BlockModalMenu.fragments.channel}
`
