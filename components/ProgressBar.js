import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from '../constants/Style'

export default class ProgressBar extends Component {
  static propTypes = {
    amountFrom: PropTypes.number.isRequired,
    amountTo: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    shouldSimulate: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    amountFrom: 0,
    amountTo: 100,
    duration: 2500,
    shouldSimulate: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      progress: new Animated.Value(props.amountFrom),
    }
  }

  componentDidMount() {
    if (this.props.shouldSimulate) {
      return this.simulate()
    }

    this.to(this.props.amountTo, this.props.duration)
  }

  to = (amount, duration) =>
    new Promise((resolve) => {
      Animated
        .timing(this.state.progress, {
          toValue: amount,
          duration,
        })
        .start(resolve)
    })

  simulate() {
    this
      .to(75, 250)
      .then(() => this.to(90, 5000))
      .then(() => this.to(99, 10000))
  }

  render() {
    const { amountFrom, amountTo, duration, ...rest } = this.props
    const { progress } = this.state

    return (
      <View {...rest}>
        <Animated.View
          style={{
            backgroundColor: Colors.gray.medium,
            height: 2,
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
    )
  }
}
