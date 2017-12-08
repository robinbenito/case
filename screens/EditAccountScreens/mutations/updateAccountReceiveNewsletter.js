import gql from 'graphql-tag'

export default gql`
  mutation updateAccountAccountReceiveNewsletterMutation($receive_newsletter: Boolean){
    update_account(input: { receive_newsletter: $receive_newsletter }) {
      clientMutationId
      me {
        id
        settings {
          receive_newsletter
        }
      }
    }
  }
`
