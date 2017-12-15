import gql from 'graphql-tag'

export default gql`
  fragment BlockModalMenuBlock on Connectable {
    id
    title
    href
    visibility
    can {
      manage
    }
    connection {
      id
      can {
        destroy
      }
    }
    kind {
      ...on Block {
        counts {
          comments
        }
      }
    }
  }
`
