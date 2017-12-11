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

import navigationService from '../../utilities/navigationService'
import params from '../../utilities/params'

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
  static propTypes = {
    // BUG: The object composition below causes this to not pass lint for some reason
    /* eslint-disable react/no-unused-prop-types */
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    headerRight: PropTypes.node,
    isHeaderTitleVisible: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
    /* eslint-enable react/no-unused-proptypes */
  }

  static defaultProps = {
    title: '',
    color: null,
    headerRight: null,
    isHeaderTitleVisible: true,
  }

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

  shouldDisplayBack = () =>
    navigationService.getCurrentIndex() > 0

  render() {
    const { isExpanded } = this.state
    const { title, color, isHeaderTitleVisible, headerRight } = {
      ...this.props,
      // The initially loaded route sometimes doesn't have a navigation prop
      ...params(this.props.navigation),
    }

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
            title={title}
            color={color}
            isExpanded={isExpanded}
            isHeaderTitleVisible={isHeaderTitleVisible}
            onPress={this.onPress}
          />

          {this.shouldDisplayBack() &&
            <HeaderLeft isExpanded={isExpanded}>
              <BackButton />
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

export default connect(({ ui: { isHeaderTitleVisible } }) =>
  ({ isHeaderTitleVisible }))(Header)
