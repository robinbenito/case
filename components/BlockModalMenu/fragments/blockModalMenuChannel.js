import gql from 'graphql-tag'

export default gql`
  fragment BlockModalMenuChannel on Channel {
    id
    title
    visibility
  }
`
