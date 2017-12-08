import gql from 'graphql-tag'

export default gql`
  mutation updateAccountEmailNotificationsMutation($receive_email: String){
    update_account(input: { receive_email: $receive_email }) {
      clientMutationId
      me {
        id
        settings {
          receive_email
        }
      }
    }
  }
`
