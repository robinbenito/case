import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import Store from '../../state/Store'
import { UPDATE_HEADER } from '../../state/actions'

import { HEADER_HEIGHT } from '../Header'
import BackButton from '../BackButton'

import { Colors, Typography, Units } from '../../constants/Style'

export const updateHeader = (options = {}) =>
  Store.dispatch({
    type: UPDATE_HEADER,
    header: options,
  })

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_HEIGHT};
  padding-top: ${Units.statusBarHeight};
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const HeaderCenter = styled.View`
  width: 75%
  height: 100%;
  justify-content: center;
`

const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  width: 100%;
  text-align: center;
  font-size: ${Typography.fontSize.medium};
  font-weight: ${Typography.fontWeight.medium};
  color: ${Colors.semantic.text};
`

const HeaderLeft = styled.View`
  position: absolute;
  z-index: 1;
  left: 0;
  top: ${Units.statusBarHeight};
  bottom: 0;
`

const HeaderRight = styled.View`
  position: absolute;
  z-index: 1;
  right: 0;
  top: ${Units.statusBarHeight};
  bottom: 0;
  justify-content: center;
`

class SubmittableHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    headerLeft: PropTypes.node,
    headerCenter: PropTypes.node,
    headerRight: PropTypes.node,
  }

  static defaultProps = {
    title: null,
    headerLeft: <BackButton />,
    headerCenter: null,
    headerRight: null,
  }

  render() {
    const { title, headerLeft, headerCenter, headerRight } = this.props

    return (
      <Container>
        {headerLeft &&
          <HeaderLeft>
            {headerLeft}
          </HeaderLeft>
        }

        <HeaderCenter>
          {headerCenter &&
            headerCenter
          }

          {!headerCenter && title &&
            <Title>
              {title}
            </Title>
          }
        </HeaderCenter>

        {headerRight &&
          <HeaderRight>
            {headerRight}
          </HeaderRight>
        }
      </Container>
    )
  }
}

const uiHeaderStateSelector = ({ ui: { header } }) =>
  ({ ...header })

export default connect(uiHeaderStateSelector)(SubmittableHeader)
