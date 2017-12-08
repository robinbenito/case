import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { BlurredAbsoluteFill, AbsoluteFill } from '../UI/Layout'
import HeaderPullDown from './HeaderPullDown'
import { HEADER_BUTTON_HEIGHT } from './HeaderButton'
import BackButton from '../BackButton'

import Store from '../../state/Store'
import { SET_HEADER_MENU_VISIBILITY } from '../../state/actions'

import { Units } from '../../constants/Style'

export const HEADER_HEIGHT = HEADER_BUTTON_HEIGHT + Units.statusBarHeight

const HeaderModal = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${({ isExpanded }) => (isExpanded ? '100%' : HEADER_HEIGHT)};
  padding-top: ${Units.statusBarHeight};
  align-items: center;
  justify-content: center;
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

const HeaderLeft = styled(HeaderRight)`
  right: auto;
  left: 0;
`

class Header extends Component {
  static HEIGHT = HEADER_HEIGHT

  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
    }
  }

  onPress = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
    Store.dispatch({
      type: SET_HEADER_MENU_VISIBILITY,
      isHeaderMenuActive: !this.state.isExpanded,
    })
  }

  onModalPress = () => {
    this.setState({ isExpanded: false })
    Store.dispatch({
      type: SET_HEADER_MENU_VISIBILITY,
      isHeaderMenuActive: false,
    })
  }

  render() {
    const { isExpanded } = this.state
    const primary = { ...this.props.primary, ...this.props.navigation.state.params }
    const { secondary, headerLeft, isHeaderTitleVisible, headerRight } = this.props

    return (
      <HeaderModal
        isExpanded={isExpanded}
        onPress={this.onModalPress}
        disabled={!isExpanded}
      >
        <AbsoluteFill>
          {isExpanded &&
            <BlurredAbsoluteFill />
          }

          <HeaderPullDown
            primary={primary}
            secondary={secondary}
            isExpanded={isExpanded}
            isHeaderTitleVisible={isHeaderTitleVisible}
            onPress={this.onPress}
          />

          {headerLeft &&
            <HeaderLeft isExpanded={isExpanded}>
              {headerLeft}
            </HeaderLeft>
          }

          {headerRight &&
            <HeaderRight isExpanded={isExpanded}>
              {headerRight}
            </HeaderRight>
          }
        </AbsoluteFill>
      </HeaderModal>
    )
  }
}

Header.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
      }),
    }),
  }).isRequired,
  primary: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  secondary: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
  headerRight: PropTypes.node,
  headerLeft: PropTypes.node,
  isHeaderTitleVisible: PropTypes.bool,
}

Header.defaultProps = {
  headerRight: null,
  headerLeft: <BackButton />,
  isHeaderTitleVisible: true,
}

export default connect(({ ui: { isHeaderTitleVisible } }) =>
  ({ isHeaderTitleVisible }))(Header)
