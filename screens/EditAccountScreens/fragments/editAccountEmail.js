import gql from 'graphql-tag'

export default gql`
  fragment EditAccountEmail on Me {
    id
    email
    unconfirmed_email
  }
`
