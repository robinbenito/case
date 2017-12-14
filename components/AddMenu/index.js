import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import AddButton from './AddButton'
import AddMenuOptions from './AddMenuOptions'
import { openModal } from '../Modal'

import { Units } from '../../constants/Style'

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding-bottom: ${Units.base};
`

class AddMenu extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    newChannel: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    title: 'Are.na',
    color: null,
    newChannel: true,
  }

  static HEIGHT = AddButton.height
  static SAFE_AREA = AddButton.height + (Units.base * 2)

  open = () => {
    const { title, color, newChannel } = this.props

    openModal({
      children: <AddMenuOptions
        title={title}
        color={color}
        newChannel={newChannel}
      />,
    })
  }

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
