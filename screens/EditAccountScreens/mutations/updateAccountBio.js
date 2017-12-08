import gql from 'graphql-tag'

export default gql`
  mutation updateAccountBioMutation($bio: String){
    update_account(input: { bio: $bio }) {
      clientMutationId
      me {
        id
        bio
      }
    }
  }
`
