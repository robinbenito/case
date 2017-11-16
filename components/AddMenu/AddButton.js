import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { BlurView } from 'expo'
import { Units } from '../../constants/Style'

const BUTTON_SIZE = 60
const PLUS_THICKNESS = 2.5
const PLUS_SIZE = 66.66
const PLUS_COLOR = 'black'

const HitArea = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.base};
`

const VisibleArea = styled(BlurView).attrs({
  intensity: 100,
})`
  border-radius: ${BUTTON_SIZE / 2};
  width: ${BUTTON_SIZE};
  height: ${BUTTON_SIZE};
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.25);
`

const PlusStrokeA = styled.View`
  position: absolute;
  width: ${PLUS_SIZE / 2}%;
  height: ${PLUS_THICKNESS};
  background-color: ${PLUS_COLOR};
`

const PlusStrokeB = styled.View`
  position: absolute;
  height: ${PLUS_SIZE / 2}%;
  width: ${PLUS_THICKNESS};
  background-color: ${PLUS_COLOR};
`

export default class AddButton extends React.Component {
  render() {
    return (
      <HitArea onPress={this.props.onPress}>
        <VisibleArea>
          <PlusStrokeA />
          <PlusStrokeB />
        </VisibleArea>
      </HitArea>
    )
  }
}

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}
