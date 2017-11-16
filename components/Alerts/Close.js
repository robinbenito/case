import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors, Units } from '../../constants/Style'

import { BaseIcon } from '../UI/Icons'

import { dismissAlert } from './index'

const CloseHitArea = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  top: 0;
  left: 0;
  padding-horizontal: ${Units.scale[1]};
  padding-vertical: ${Units.scale[1]};
  opacity: ${x => (x.type === 'alert' ? 0.25 : 0.75)};
`

const CloseIcon = styled(BaseIcon).attrs({
  name: 'md-close-circle',
})`
  color: ${x => Colors.alert[x.type].foreground};
`

export default class Close extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static isDimissing = false

  componentDidMount() {
    if (this.isDimissing) return
    if (this.props.type !== 'alert') return

    setTimeout(() => {
      dismissAlert(this.props.id)
    }, 10000)

    this.isDimissing = true
  }

  onPress = () => {
    dismissAlert(this.props.id)
  }

  render() {
    return (
      <CloseHitArea {...this.props} onPress={this.onPress}>
        <CloseIcon {...this.props} />
      </CloseHitArea>
    )
  }
}
