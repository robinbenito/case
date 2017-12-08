import gql from 'graphql-tag'

export default gql`
  fragment EditAccountBio on Me {
    id
    bio
  }
`
