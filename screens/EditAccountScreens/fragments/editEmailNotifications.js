import gql from 'graphql-tag'

export default gql`
  fragment EditEmailNotifications on Me {
    id
    settings {
      receive_email
    }
  }
`
