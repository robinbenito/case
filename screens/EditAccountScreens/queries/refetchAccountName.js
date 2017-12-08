import gql from 'graphql-tag'

export default gql`
  query refetchAccountNameQuery($id: ID!) {
    me {
      id
      name
      initials
    }

    user(id: $id) {
      id
      name
      initials
    }
  }
`
