import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Share,
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
    justifyContent: 'space-between',
    width,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.padding * 2,
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
          style={[styles.option, { alignItems: 'flex-start' }]}
          onPress={() => {
            NavigatorService.navigate('connect', {
              onCancel: () => NavigatorService.back(),
              block_id: block.id,
              title: block.title,
            })
          }}
        >
          <Text style={styles.label}>Connect →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            NavigatorService.navigate('comment', { id: block.id })
          }}
        >
          <Text style={styles.label}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { alignItems: 'flex-end' }]}
          onPress={() => Share.share({ url: `https://www.are.na/block/${block.id}` })}
        >
          <Text style={styles.label}>Share</Text>
        </TouchableOpacity>
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
