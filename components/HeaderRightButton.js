import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Colors, Units, Typography } from '../constants/Style'

const Button = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[2]};
`

const ButtonText = styled.Text`
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium')};
  color: ${Colors.gray.semiBold};
`

export default class HeaderRightButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSaving: false,
    }
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    if (this.state.isSaving) return false
    this.setState({ isSaving: true })
    return this.props.onPress()
  }

  render() {
    const { text } = this.props

    return (
      <Button onPress={this.onPress}>
        <ButtonText>{text}</ButtonText>
      </Button>
    )
  }
}

HeaderRightButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

HeaderRightButton.defaultProps = {
  onPress: () => null,
}
