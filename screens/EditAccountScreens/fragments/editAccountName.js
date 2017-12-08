import gql from 'graphql-tag'

export default gql`
  fragment EditAccountName on Me {
    id
    first_name
    last_name
  }
`
