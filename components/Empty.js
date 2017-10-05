import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Units, Typography, Colors } from '../constants/Style'

const EmptyText = styled.Text`
  font-size: ${Typography.fontSize.medium};
  color: ${Colors.gray.semiBold}
`

const Container = styled.View`
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.base};
  align-items: center;
  justify-content: center;
  flex: 1;
`

export default class Empty extends React.Component {
  render() {
    const { children, text } = this.props
    const content = children || (
      <EmptyText>{text}</EmptyText>
    )

    return (
      <Container>
        {content}
      </Container>
    )
  }
}

Empty.propTypes = {
  children: PropTypes.any,
  text: PropTypes.string,
}

Empty.defaultProps = {
  children: null,
  text: null,
}
