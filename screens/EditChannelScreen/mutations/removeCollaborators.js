import { gql } from 'react-apollo'
import ChannelForm from '../../../components/Form/ChannelForm'

export default gql`
  mutation removeCollaboratorsMutation($user_ids: [ID]!, $channel_id: ID!){
    remove_collaborators(input: { user_ids: $user_ids, channel_id: $channel_id }) {
      channel {
        ...ChannelForm
      }
    }
  }
  ${ChannelForm.fragments.channelForm}
`
