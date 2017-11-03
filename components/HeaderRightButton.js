import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import * as is from '../utilities/is'

import { Colors, Units, Typography } from '../constants/Style'

const Button = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[2]};
`

const Label = styled.Text`
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium')};
  color: ${Colors.gray.semiBold};
  opacity: ${x => (x.disabled ? 0.5 : 1)};
`

export default class HeaderRightButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false,
    }
  }

  onPress = async () => {
    this.setState({ disabled: true })

    try {
      await Promise.resolve(this.props.onPress())
    } finally {
      this.setState({ disabled: false })
    }
  }

  render() {
    const { text, onPress, ...rest } = this.props
    const { disabled } = this.state

    return (
      <Button onPress={this.onPress} disabled={disabled} {...rest}>
        <Label disabled={disabled}>{text}</Label>
      </Button>
    )
  }
}

HeaderRightButton.propTypes = {
  // TODO: Accept children instead
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

HeaderRightButton.defaultProps = {
  onPress: () => null,
}
