import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

import AddMenu from '../../AddMenu'

import { Units } from '../../../constants/Style'

const LoadingIndicator = styled(ActivityIndicator)`
  margin-vertical: ${Units.base};
`

const Footer = styled.View`
  align-self: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 55%;
  padding-top: ${Units.base};
  padding-bottom: ${x => (x.addMenu ? (AddMenu.SAFE_AREA + Units.base) : Units.base)};
`

export default class FlatListFooter extends Component {
  static propTypes = {
    addMenu: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    addMenu: true,
    children: null,
  }

  render() {
    const { addMenu, loading, children, ...rest } = this.props

    return (
      <Footer addMenu={addMenu} {...rest}>
        {loading &&
          <LoadingIndicator
            animating
            size="small"
          />
        }

        {children && children}
      </Footer>
    )
  }
}
