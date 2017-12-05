import gql from 'graphql-tag'

export default gql`
  mutation deleteConnectionMutation($id: ID!) {
    delete_connection(input: { id: $id }) {
      clientMutationId
      status
    }
  }
`
