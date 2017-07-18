import React from 'react'
import {
  Text,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'

import BlockItem from '../../../components/BlockItem'

const FeedContents = ({ items }) => {
  const contentsItems = items.map((item) => {
    console.log('item', item)
    let objectItem = null
    if (item) {
      const { __typename } = item
      
      switch (__typename) {
        case 'Block':
          objectItem = <BlockItem block={item} />
          break
        default:
          objectItem = <Text> </Text>
      }
      return objectItem
    }
  })
  return <ScrollView horizontal>{contentsItems}</ScrollView> || <Text> Hello </Text>
}

FeedContents.propTypes = {
  items: PropTypes.any,
}

FeedContents.defaultProps = {
  items: [],
}

export default FeedContents
