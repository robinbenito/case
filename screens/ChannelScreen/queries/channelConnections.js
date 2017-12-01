import gql from 'graphql-tag'

import ChannelItem from '../../../components/ChannelItem'

export default gql`
  query ChannelConnectionsQuery($id: ID!) {
    channel(id: $id) {
      __typename
      id
      counts {
        connections
      }
      contents: connections {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`
