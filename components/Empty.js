import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import AddMenu from './AddMenu'

import { Units, Typography, Colors } from '../constants/Style'

const EmptyText = styled.Text`
  font-size: ${Typography.fontSize.medium};
  color: ${Colors.gray.semiBold}
`

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${Units.base};
  padding-top: ${Units.base};
  padding-bottom: ${AddMenu.SAFE_AREA + Units.base};
`

export default class Empty extends Component {
  static propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    text: null,
  }

  render() {
    const { children, text, ...rest } = this.props
    const content = children || <EmptyText>{text}</EmptyText>

    return (
      <Container {...rest}>
        {content}
      </Container>
    )
  }
}
