import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {
  TouchableWithoutFeedback,
} from 'react-native'

import { BaseIcon } from '../UI/Icons'
import { Colors, Units, Border } from '../../constants/Style'

const IconCircle = styled.View`
  border-radius: 30;
  width: 60;
  height: 60;
  background-color: ${Colors.semantic.background};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${Units.scale[3]};
  right: ${Units.scale[3]};
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
`

const Icon = styled(BaseIcon)`
  font-size: 40;
`

export default class AddIcon extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <IconCircle>
          <Icon name="ios-add" />
        </IconCircle>
      </TouchableWithoutFeedback>
    )
  }
}

AddIcon.propTypes = {
  onPress: PropTypes.func,
}

AddIcon.defaultProps = {
  onPress: () => null,
}
