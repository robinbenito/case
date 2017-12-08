import gql from 'graphql-tag'

export default gql`
  fragment EditAccountReceiveNewsletter on Me {
    id
    settings {
      receive_newsletter
    }
  }
`
