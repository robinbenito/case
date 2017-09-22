import { get } from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Units } from '../../constants/Style'
import HeaderPullDown from './HeaderPullDown'
import { HEADER_BUTTON_HEIGHT } from './HeaderButton'

export const HEADER_HEIGHT = HEADER_BUTTON_HEIGHT + Units.statusBarHeight

const HeaderModal = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${({ isExpanded }) => (isExpanded ? '100%' : HEADER_HEIGHT)};
  padding-top: ${Units.statusBarHeight}
  align-items: center;
  justify-content: center;
  background-color: ${({ isExpanded }) => (isExpanded ? 'rgba(0,0,0,0.5)' : 'white')};
`

const HeaderRight = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  height: ${HEADER_HEIGHT};
  padding-top: ${Units.statusBarHeight};
  padding-right: ${Units.statusBarHeight / 2};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: ${({ isExpanded }) => (isExpanded ? 'none' : 'flex')}
`

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
    }

    this.onPress = this.onPress.bind(this)
    this.onModalPress = this.onModalPress.bind(this)
  }

  onPress() {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  onModalPress() {
    this.setState({ isExpanded: false })
  }

  render() {
    const title = get(this, 'props.navigation.state.params.title')

    return (
      <HeaderModal
        onPress={this.onModalPress}
        isExpanded={this.state.isExpanded}
      >
        <HeaderPullDown
          title={title}
          onPress={this.onPress}
          isExpanded={this.state.isExpanded}
          primary={this.props.primary}
          secondary={this.props.secondary}
        />

        {this.props.headerRight &&
          <HeaderRight isExpanded={this.state.isExpanded}>
            {this.props.headerRight}
          </HeaderRight>
        }
      </HeaderModal>
    )
  }
}
