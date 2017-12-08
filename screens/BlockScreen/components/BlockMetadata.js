import React from 'react'
import PropTypes from 'prop-types'
import { Share } from 'react-native'
import styled from 'styled-components/native'
import UserNameText from '../../../components/UserNameText'
import ExternalLink from '../../../components/UI/Link'
import HTML from '../../../components/HTML'
import { Units, Typography, Colors } from '../../../constants/Style'

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

const BlockMetadata = ({ block }) => {
  const { kind: { __typename: typeName } } = block
  const sourceUrl = block.source.url || block.kind.image_url

  return (
    <Container>
      <Title>
        {block.title}
      </Title>

      <Metadata>
        Added {block.created_at} by <UserNameLink user={block.user} />
      </Metadata>

      <Description
        value={block.displayDescription || '<p>—</p>'}
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

        {typeName === 'Image' &&
          <ExternalAction url={`https://www.google.com/searchbyimage?&image_url=${block.kind.image_url}`}>
            Find original
          </ExternalAction>
        }

        <Action onPress={() => Share.share({ url: `https://www.are.na/block/${block.id}` })}>
          Share
        </Action>
      </Actions>
    </Container>
  )
}

BlockMetadata.propTypes = {
  block: PropTypes.any,
}

BlockMetadata.defaultProps = {
  block: {},
}

export default BlockMetadata
