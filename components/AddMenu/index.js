import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import AddButton from './AddButton'
import AddMenuOptions from './AddMenuOptions'
import { openModal } from '../Modal'

import { Units } from '../../constants/Style'

const HEIGHT_WITH_PADDING = AddButton.height + (Units.scale[2] * 2)

const Container = styled.View`
  display: ${x => (x.visible ? 'flex' : 'none')};
  width: 100%;
  height: ${HEIGHT_WITH_PADDING};
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

class AddMenu extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    title: 'Are.na',
    visible: false,
  }

  open = () =>
    openModal({ children: <AddMenuOptions /> })

  render() {
    const { title, visible } = this.props

    return (
      <Container visible={visible}>
        <AddButton
          title={title}
          onPress={this.open}
        />
      </Container>
    )
  }
}

export default connect(({ ui: { isAddButtonVisible } }) =>
  ({ visible: isAddButtonVisible }))(AddMenu)
