import React, { Component } from 'react'
import styled from 'styled-components/native'
import { decode } from 'he'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import { Metadata, Title, Attribution } from './Meta'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ImageThumb = styled.Image`
  resize-mode: contain;
  width: 40;
  height: 40;
`

export default class ConnectableResult extends Component {
  render() {
    const { connectable } = this.props

    return (
      <Container>
        <Metadata>
          <Title>
            {connectable.title ? decode(connectable.title) : null}
          </Title>

          <Attribution>
            {connectable.kind.__typename} • {connectable.user.name}
          </Attribution>
        </Metadata>

        {connectable.kind.image_url &&
          <ImageThumb
            source={{
              uri: connectable.kind.image_url,
            }}
          />
        }
      </Container>
    )
  }
}

ConnectableResult.fragments = {
  connectable: gql`
    fragment ConnectableResult on Connectable {
      __typename
      id
      title
      user {
        id
        name
      }
      kind {
        __typename
        ... on Attachment {
          image_url(size: THUMB)
        }
        ... on Embed {
          image_url(size: THUMB)
        }
        ... on Image {
          image_url(size: THUMB)
        }
        ... on Link {
          image_url(size: THUMB)
        }
      }
    }
  `,
}

ConnectableResult.propTypes = {
  connectable: propType(ConnectableResult.fragments.connectable).isRequired,
}
