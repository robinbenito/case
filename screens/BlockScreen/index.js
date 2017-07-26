import React from 'react'
import {
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

import layout from '../../constants/Layout'

import BlockContents from './components/BlockContents'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: (layout.padding * 4),
    alignItems: 'center',
  },
})

export default class BlockScreen extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params
    console.log('id', id)
    return (
      <BlockContents id={id} />
    )
  }
}

BlockScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
