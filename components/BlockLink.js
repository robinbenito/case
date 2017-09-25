import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

import NavigatorService from '../utilities/navigationService'

import layout from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: layout.padding,
  },
  text: {
    fontWeight: 'bold',
  },
})

export default class BlockText extends React.Component {
  constructor(props) {
    super(props)
    this.goToBlock = this.goToBlock.bind(this)
  }

  goToBlock() {
    this.props.onPress()
    NavigatorService.navigate('block', {
      id: this.props.block.id,
      title: this.props.block.title,
    })
  }

  render() {
    const { style } = this.props

    return (
      <Text style={[styles.text, style]} onPress={this.goToBlock}>{this.props.block.title} </Text>
    )
  }
}

BlockText.propTypes = {
  style: PropTypes.any,
  block: PropTypes.any.isRequired,
  onPress: PropTypes.func,
}

BlockText.defaultProps = {
  style: {},
  onPress: () => null,
}
