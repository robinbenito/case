import gql from 'graphql-tag'

import UserNameText from '../../../components/UserNameText'

export default gql`
  fragment BlockMetadata on Connectable {
    id
    href
    title
    visibility
    user {
      ...UserNameText
    }
    created_at(relative: true)
    displayDescription: description(format: HTML)
    source {
      source_url: url
    }
    kind {
      ... on Image {
        __typename
        image_url(size: ORIGINAL)
      }
    }
  }
  ${UserNameText.fragment}
`
