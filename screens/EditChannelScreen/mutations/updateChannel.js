import { gql } from 'react-apollo'
import ChannelForm from '../../../components/Form/ChannelForm'

export default gql`
  mutation updateChannelMutation($id: ID!, $title: String!, $description: String, $visibility: ChannelVisibility){
    update_channel(input: { id: $id, title: $title, description: $description, visibility: $visibility }) {
      clientMutationId
      channel {
        ...ChannelForm
      }
    }
  }
  ${ChannelForm.fragments.channelForm}
`
