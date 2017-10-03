import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import NavigatorService from '../utilities/navigationService'

export default class BlockText extends React.Component {
  goToBlock = () => {
    this.props.onPress()

    NavigatorService.navigate('block', {
      id: this.props.block.id,
      title: this.props.block.title,
    })
  }

  render() {
    const { block: { title, kind: { __typename } }, ...rest } = this.props

    return (
      <Text onPress={this.goToBlock} {...rest}>
        {title || `${__typename.match(/^[AEIOU]/) ? 'an' : 'a'} ${__typename.toLowerCase()}`}
      </Text>
    )
  }
}

BlockText.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.any.isRequired,
    title: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
}

BlockText.defaultProps = {
  onPress: () => null,
}
