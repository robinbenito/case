import { gql } from 'react-apollo'
import ChannelForm from '../../../components/Form/ChannelForm'

export default gql`
  query editChannelQuery($id: ID!){
    channel(id: $id) {
      id
      ...ChannelForm
    }
  }
  ${ChannelForm.fragments.channelForm}
`
