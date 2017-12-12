import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { decode } from 'he'
import { connect } from 'react-redux'

import HeaderPullDownDrawer from './HeaderPullDownDrawer'
import { HeaderButton, HeaderButtonLabel, Caret } from './HeaderButton'
import { openModal } from '../Modal'

import { Units } from '../../constants/Style'

const Container = styled.View`
  position: absolute;
  top: ${Units.statusBarHeight};
  width: 100%;
`

class HeaderPullDown extends Component {
  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    isHeaderTitleVisible: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    title: '',
    color: null,
  }

  onPress = () => {
    const { title } = this.props

    openModal({
      children: <HeaderPullDownDrawer title={title} />,
    })
  }

  render() {
    const { title, color, isHeaderTitleVisible } = this.props

    return (
      <Container>
        <HeaderButton onPress={this.onPress}>
          <HeaderButtonLabel color={color}>
            {isHeaderTitleVisible && title && decode(title)}
            <Caret color={color} />
          </HeaderButtonLabel>
        </HeaderButton>
      </Container>
    )
  }
}

export default connect(({ ui: { isHeaderTitleVisible } }) =>
  ({ isHeaderTitleVisible }))(HeaderPullDown)
