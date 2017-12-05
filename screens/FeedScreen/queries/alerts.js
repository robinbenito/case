import gql from 'graphql-tag'

export default gql`
  query AlertsQuery {
    alerts: me {
      id
      is_confirmed
      unconfirmed_email
      is_exceeding_private_connections_limit
    }
  }
`
