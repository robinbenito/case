import gql from 'graphql-tag'

export default gql`
  mutation ReadNotificationMutation($notification_id: ID!){
    read_notification(input: { notification_id: $notification_id }) {
      deed {
        __typename
        id
        is_read
      }
    }
  }
`
