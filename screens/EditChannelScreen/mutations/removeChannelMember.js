import gql from 'graphql-tag'
import ChannelForm from '../../../components/Form/ChannelForm'

export default gql`
  mutation removeChannelMember($member_id: ID!, $member_type: MemberTypes, $channel_id: ID!) {
    remove_channel_members(input: { id: $channel_id, members: [{ id: $member_id, type: $member_type }] }) {
      channel {
        ...ChannelForm
      }
    }
  }
  ${ChannelForm.fragments.channelForm}
`
