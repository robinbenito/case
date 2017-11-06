import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Typography, Colors } from '../../../constants/Style'

const Message = styled.Text`
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base')};
  color: ${Colors.semantic.text};
`

const Strong = styled.Text`
  font-weight: ${Typography.fontWeight.semiBold};
`

const StatusMessage = ({ title, isActive, ...rest }) => {
  if (isActive) {
    return (
      <Message {...rest}>
        Connect <Strong>&#8220;{title}&#8220;</Strong> to:
      </Message>
    )
  }

  return (
    <Message {...rest}>
      Recent channels:
    </Message>
  )
}

StatusMessage.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

StatusMessage.defaultProps = {
  title: 'Untitled block',
  isActive: false,
}

export default StatusMessage
