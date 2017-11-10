import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import UserNameText from './UserNameText'
import FeedWordLink from './FeedWordLink'
import { Typography, Units, Colors } from '../constants/Style'

const Container = styled.View`
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[3]};
  margin-bottom: ${Units.base};
`

const Sentence = styled.Text`
  color: ${Colors.semantic.text};
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium', 'compact')};
  font-weight: ${Typography.fontWeight.semiBold};
`

const Timestamp = styled.Text`
  margin-top: ${Units.scale[1]};
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
`

const FeedGroupSentence = ({ group }) => {
  const { user, verb, connector, target, object } = group

  const targetColor = ((target && target.__typename === 'Channel')
    ? Colors.channel[target.visibility]
    : null
  )

  return (
    <Container>
      <Sentence>
        <UserNameText user={user} />

        <Text>
          {verb === 'commented' ? ': ' : ` ${verb} `}
        </Text>

        <FeedWordLink
          object={object}
          phrase={group.object_phrase}
        />

        <Text> {connector} </Text>

        <FeedWordLink
          object={target}
          phrase={group.target_phrase}
          style={{
            color: targetColor,
          }}
        />
      </Sentence>

      <Timestamp>
        {group.created_at}
      </Timestamp>
    </Container>
  )
}

FeedGroupSentence.propTypes = {
  group: PropTypes.any.isRequired,
}

export default FeedGroupSentence
