import { gql } from 'react-apollo'

export default gql`
  mutation createBlockMutation($channel_ids: [ID]!, $title: String, $content: String, $description: String, $source_url: String){
    create_block(input: { channel_ids: $channel_ids, title: $title, content: $content, description: $description, source_url: $source_url }) {
      clientMutationId
      block {
        id
        state
        title
      }
      channels {
        id
        title
        visibility
      }
    }
  }
`
