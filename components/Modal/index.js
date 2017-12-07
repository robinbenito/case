import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { AbsoluteFill, BlurredAbsoluteFill, TouchableFill } from '../UI/Layout'

import { Units } from '../../constants/Style'

import Store from '../../state/Store'
import { OPEN_MODAL, CLOSE_MODAL } from '../../state/actions'

const BackgroundFill = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.base};
  justify-content: flex-end;
`

export const openModal = (options = {}) =>
  Store.dispatch({
    type: OPEN_MODAL,
    modal: options,
  })

export const closeModal = () =>
  Store.dispatch({ type: CLOSE_MODAL })

class Modal extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    active: false,
    children: null,
  }

  render() {
    const { active, children } = this.props

    if (!active) return <View />

    return (
      <TouchableFill onPress={closeModal} active={active}>
        <BlurredAbsoluteFill />

        <BackgroundFill>
          {children}
        </BackgroundFill>
      </TouchableFill>
    )
  }
}

export default connect(({ ui }) => ({ ...ui.modal }))(Modal)
