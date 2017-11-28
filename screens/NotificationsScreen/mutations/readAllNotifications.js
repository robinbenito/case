import { gql } from 'react-apollo'

export default gql`
  mutation ReadAllNotificationsMutation {
    clear_notifications(input: { confirm: true }) {
      me {
        id
      }
    }
  }
`
