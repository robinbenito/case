import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import AddButton from './AddButton'
import AddMenuOptions from './AddMenuOptions'
import { openModal } from '../Modal'

import { Units } from '../../constants/Style'

const INACTIVE_HEIGHT = AddButton.height + (Units.scale[2] * 2)

const Container = styled.View`
  width: 100%;
  height: ${INACTIVE_HEIGHT};
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

class AddMenu extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: 'Are.na',
  }

  open = () =>
    openModal({ children: <AddMenuOptions /> })

  render() {
    const { title } = this.props

    return (
      <Container>
        <AddButton
          title={title}
          onPress={this.open}
        />
      </Container>
    )
  }
}

export default AddMenu
