import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Colors, Units, Typography } from '../constants/Style'

const Button = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[2]};
  opacity: ${x => (x.disabled ? 0.5 : 1)};
`

const Label = styled.Text`
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium')};
  color: ${Colors.gray.semiBold};
`

export default class HeaderRightButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false,
    }
  }

  onPress = async () => {
    if (this.state.isSaving) return false

    this.setState({ disabled: true })

    const promise = this.props.onPress()

    try {
      await promise
    } finally {
      this.setState({ disabled: false })
    }

    return promise
  }

  render() {
    const { text, ...rest } = this.props
    const { disabled } = this.state

    return (
      <Button onPress={this.onPress} disabled={disabled} {...rest}>
        <Label>{text}</Label>
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
