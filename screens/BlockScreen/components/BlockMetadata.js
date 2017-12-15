import React, { Component } from 'react'
import { Share } from 'react-native'
import styled from 'styled-components/native'
import { propType } from 'graphql-anywhere'

import UserNameText from '../../../components/UserNameText'
import ExternalLink from '../../../components/UI/Link'
import HTML from '../../../components/HTML'

import { Units, Typography, Colors } from '../../../constants/Style'

import blockMetadataFragment from '../fragments/blockMetadata'

const Container = styled.View`
  width: 100%;
  margin-vertical: ${Units.base};
  padding-horizontal: ${Units.scale[3]};
`

const Title = styled.Text`
  font-size: ${Typography.fontSize.h2};
  line-height: ${Typography.lineHeightFor(Typography.fontSize.h2)};
  font-weight: ${Typography.fontWeight.semiBold};
  color: ${Colors.semantic.text};
  margin-bottom: ${Units.scale[2]};
`

const Metadata = styled.Text`
  margin-bottom: ${Units.scale[2]};
  margin-right: ${Units.scale[2]};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
  color: ${Colors.semantic.text};
`

const Description = styled(HTML)`
  margin-right: ${Units.scale[2]};
`

const UserNameLink = styled(UserNameText)`
  font-weight: ${Typography.fontWeight.bold};
`

const Actions = styled.View`
  margin-vertical: ${Units.base};
`

const action = `
  margin-vertical: ${Units.scale[1] / 2};
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base')};
  font-weight: ${Typography.fontWeight.bold};
  color: ${Colors.semantic.text};
`

const Action = styled.Text`${action}`
const ExternalAction = styled(ExternalLink)`${action}`

export default class BlockMetadata extends Component {
  static propTypes = {
    block: propType(blockMetadataFragment).isRequired,
  }

  static fragment = blockMetadataFragment

  render() {
    const {
      block: {
        href,
        user,
        title,
        created_at,
        visibility,
        displayDescription,
        source: {
          source_url,
        },
        kind: {
          __typename,
          image_url,
        },
      },
    } = this.props

    // TODO: Put this in the GraphQL response
    const sourceUrl = source_url || image_url

    return (
      <Container>
        <Title>
          {title}
        </Title>

        <Metadata>
          Added {created_at} by <UserNameLink user={user} />
        </Metadata>

        <Description
          value={displayDescription || '<p>—</p>'}
          stylesheet={{
            p: {
              fontSize: Typography.fontSize.small,
              lineHeight: Typography.lineHeightFor('small'),
            },
          }}
        />

        <Actions>
          {sourceUrl &&
            <ExternalAction url={sourceUrl}>
              Source
            </ExternalAction>
          }

          {__typename === 'Image' &&
            <ExternalAction url={`https://www.google.com/searchbyimage?&image_url=${image_url}`}>
              Find original
            </ExternalAction>
          }

          {visibility !== 'private' &&
            <Action onPress={() => Share.share({ url: `https://www.are.na${href}` })}>
              Share
            </Action>
          }
        </Actions>
      </Container>
    )
  }
}
