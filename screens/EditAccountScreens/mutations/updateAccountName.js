import gql from 'graphql-tag'

export default gql`
  mutation updateAccountNameMutation($first_name: String, $last_name: String){
    update_account(input: { first_name: $first_name, last_name: $last_name }) {
      clientMutationId
      me {
        id
        first_name
        last_name
      }
    }
  }
`
