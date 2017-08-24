import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import NavigatorService from '../../../utilities/navigationService'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'
import type from '../../../constants/Type'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    height: layout.subtabbar,
    backgroundColor: colors.gray.background,
    borderTopColor: colors.gray.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    width,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: type.sizes.normal,
  },
})

export default class BlockActionTabs extends React.Component {
  render() {
    const { block } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            NavigatorService.navigate('connect', {
              onCancel: () => NavigatorService.back(),
              block_id: block.id,
              title: block.title,
            })
          }}
        >
          <Text style={styles.label}>Connect</Text>
        </TouchableOpacity>
        <View style={styles.option}>
          <Text style={styles.label}>Comment</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Share</Text>
        </View>
      </View>
    )
  }
}

BlockActionTabs.propTypes = {
  block: PropTypes.any,
}

BlockActionTabs.defaultProps = {
  block: {},
}
