import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import HeaderPullDown from './HeaderPullDown'
import { HEADER_BUTTON_HEIGHT } from './HeaderButton'
import BackButton from '../BackButton'

import { Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'
import params from '../../utilities/params'

export const HEADER_HEIGHT = HEADER_BUTTON_HEIGHT + Units.statusBarHeight

const Container = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${HEADER_HEIGHT};
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
`

const HeaderLeft = styled(HeaderRight)`
  right: auto;
  left: 0;
`

export default class Header extends Component {
  static propTypes = {
    // BUG: The object composition below causes this to not pass lint for some reason
    /* eslint-disable react/no-unused-prop-types */
    title: PropTypes.string,
    color: PropTypes.string,
    headerRight: PropTypes.node,
    /* eslint-enable react/no-unused-proptypes */
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    title: '',
    color: null,
    headerRight: null,
  }

  static HEIGHT = HEADER_HEIGHT

  shouldDisplayBack = () =>
    navigationService.getCurrentIndex() > 0

  render() {
    const { title, color, headerRight } = {
      ...this.props,
      ...params(this.props.navigation),
    }

    return (
      <Container>
        <HeaderPullDown
          title={title}
          color={color}
        />

        {this.shouldDisplayBack() &&
          <HeaderLeft>
            <BackButton />
          </HeaderLeft>
        }

        {headerRight &&
          <HeaderRight>
            {headerRight}
          </HeaderRight>
        }
      </Container>
    )
  }
}
