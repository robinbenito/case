import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import UserNameText from '../../../components/UserNameText'

import layout from '../../../constants/Layout'
import type from '../../../constants/Type'
import colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  metadata: {
    marginTop: layout.padding * 4,
    paddingHorizontal: layout.padding,
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  description: {
    paddingVertical: layout.padding,
    color: colors.gray.text,
    fontSize: type.sizes.normal,
    lineHeight: type.lineHeights.normal,
  },
  title: {
    fontWeight: type.weights.semibold,
    color: colors.gray.text,
  },
  authorContainer: {
    paddingTop: layout.padding,
    flexDirection: 'row',
  },
  author: {
    color: colors.gray.text,
    fontSize: type.sizes.normal,
  },
})

export default class BlockMetadata extends React.Component {
  render() {
    const { block } = this.props

    return (
      <View style={styles.metadata}>
        <Text style={styles.title}>
          {block.title}
        </Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>Added {block.updated_at} by </Text>
          <UserNameText user={block.user} style={styles.author} />
        </View>
        <Text style={styles.description}>
          {block.description}
        </Text>
      </View>
    )
  }
}

BlockMetadata.propTypes = {
  block: PropTypes.any,
}

BlockMetadata.defaultProps = {
  block: {},
}
