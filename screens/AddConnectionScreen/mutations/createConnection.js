import { gql } from 'react-apollo'

export default gql`
  mutation createConnectionMutation($channel_ids: [ID]!, $connectable_id: ID!, $connectable_type: BaseConnectableTypeEnum!){
    create_connection(input: { channel_ids: $channel_ids, connectable_type: $connectable_type, connectable_id: $connectable_id }) {
      connectable {
        id
        title
      }
    }
  }
`
