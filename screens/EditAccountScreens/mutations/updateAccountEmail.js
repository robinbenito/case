import gql from 'graphql-tag'

export default gql`
  mutation updateAccountEmailMutation($email: String){
    update_account(input: { email: $email }) {
      clientMutationId
      me {
        id
        email
        unconfirmed_email
      }
    }
  }
`
