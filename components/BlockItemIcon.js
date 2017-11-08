import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { BaseIcon } from './UI/Icons'
import { Colors, Units } from '../constants/Style'

const Icon = styled(BaseIcon)`
  margin-left: ${Units.scale[2]};
  bottom: 0;
`

export default class BlockItemIcon extends React.Component {
  render() {
    const { type, size, color, ...rest } = this.props

    const name = {
      Link: 'ios-link',
      Embed: 'ios-play',
      Attachment: 'ios-paper-outline',
    }[type]

    if (!name) { return <View /> }

    return (
      <Icon
        name={name}
        style={{
          color,
          fontSize: size,
        }}
        {...rest}
      />
    )
  }
}

BlockItemIcon.propTypes = {
  type: PropTypes.oneOf([
    'Link',
    'Embed',
    'Attachment',
    'Text',
    'Image',
    'Block',
  ]).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
}

BlockItemIcon.defaultProps = {
  size: 10,
  color: Colors.semantic.text,
}
