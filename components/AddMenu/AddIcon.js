import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {
  Animated,
  Easing,
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

const AnimatedCircle = Animated.createAnimatedComponent(IconCircle)

export default class AddIcon extends React.Component {
  constructor(props) {
    super(props)
    const rotationValue = props.active ? 1 : 0
    this.state = {
      rotation: new Animated.Value(rotationValue),
      active: props.active,
    }
    this.onPress = this.onPress.bind(this)
    this.spin = this.spin.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      active: props.active,
    })
    this.spin()
  }

  onPress() {
    this.spin()
    this.props.onPress()
  }

  spin() {
    const { active } = this.state
    const toValue = active ? 0 : 1
    this.setState({ active: !active })
    Animated.timing(this.state.rotation, {
      toValue,
      duration: 100,
      easing: Easing.linear,
    }).start()
  }

  render() {
    const rotateAnimation = {
      transform: [
        {
          rotate: this.state.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    }

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <AnimatedCircle style={rotateAnimation}>
          <Icon name="ios-add" />
        </AnimatedCircle>
      </TouchableWithoutFeedback>
    )
  }
}

AddIcon.propTypes = {
  onPress: PropTypes.func,
  active: PropTypes.bool,
}

AddIcon.defaultProps = {
  onPress: () => null,
  active: false,
}
