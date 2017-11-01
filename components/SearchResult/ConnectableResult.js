import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { decode } from 'he'

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

export default class ConnectableResult extends React.Component {
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

ConnectableResult.propTypes = {
  connectable: PropTypes.any.isRequired,
}
