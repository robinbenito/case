import gql from 'graphql-tag'

import blockModalMenuBlockFragment from '../../BlockModalMenu/fragments/blockModalMenuBlock'

export default gql`
  fragment BlockThumb on Connectable {
    __typename
    id
    title
    state
    updated_at(relative: true)
    user {
      id
      name
    }
    klass
    source {
      url
    }
    kind {
      __typename
      ... on Attachment {
        image_url(size: DISPLAY)
      }
      ... on Embed {
        image_url(size: DISPLAY)
        source_url
      }
      ... on Text {
        content(format: HTML)
      }
      ... on Image {
        image_url(size: DISPLAY)
      }
      ... on Link {
        image_url(size: DISPLAY)
      }
      ... on Channel {
        visibility
        counts {
          contents
        }
      }
    }
    ...BlockModalMenuBlock
  }
  ${blockModalMenuBlockFragment}
`
