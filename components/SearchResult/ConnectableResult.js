import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { decode } from 'he'

import { Meta, MetaText, Section } from './Meta'

import { Typography, Colors } from '../../constants/Style'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.Text`
  font-size: ${Typography.fontSize.smedium}
  color: ${Colors.gray.semiBold};
`

const ImageThumb = styled.Image`
  resize-mode: contain;
  width: 40;
  height: 40;
`

export default class ConnectableResult extends React.Component {
  render() {
    const { connectable } = this.props
    const { kind: { __typename: kindType } } = connectable

    const ConnectableImage = connectable.kind.image_url ? (
      <Section>
        <ImageThumb
          cache="force-cache"
          source={{ uri: connectable.kind.image_url, cache: 'force-cache' }}
        />
      </Section>
    ) : null

    const title = connectable.title ? decode(connectable.title) : null

    return (
      <Container>
        <Section>
          <Title>
            {title}
          </Title>
          <Meta>
            <MetaText onPress={this.goToChannel}>
              {kindType} • {connectable.user.name}
            </MetaText>
          </Meta>
        </Section>

        {ConnectableImage}
      </Container>
    )
  }
}

ConnectableResult.propTypes = {
  connectable: PropTypes.any.isRequired,
}
