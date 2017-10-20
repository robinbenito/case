import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors, Typography, Units } from '../../constants/Style'

import Close from './Close'

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[3]};
  background-color: ${x => Colors.alert[x.type].background};
`

const Message = styled.Text`
  color: ${x => Colors.alert[x.type].foreground};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
  text-align: center;
`

export default class Alert extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['alert', 'premium', 'confirmation', 'tip']),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    type: 'alert',
  }

  render() {
    const { id, type, children } = this.props

    return (
      <Container type={type}>
        <Close id={id} type={type} />

        <Message type={type}>
          {children}
        </Message>
      </Container>
    )
  }
}
