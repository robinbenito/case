import React from 'react'
import {
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

import BlockItem from '../../../components/BlockItem'
import UserAvatar from '../../../components/UserAvatar'
// import ChannelItem from '../../../components/ChannelItem'

import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    marginTop: layout.padding,
  },
})

const FeedContents = ({ items }) => {
  const contentsItems = items.map((item) => {
    let objectItem = null
    if (item) {
      const { __typename } = item
      switch (__typename) {
        case 'Block':
          objectItem = <BlockItem block={item} key={item.id} />
          break
        case 'User':
          objectItem = <UserAvatar user={item} key={item.id} />
          break
        // case 'Channel':
        //   objectItem = <ChannelItem channel={item} key={item.id} />
        //   break
        default:
          objectItem = <Text key={`klass-${item.id}`} >{item.id}</Text>
          break
      }
      return objectItem
    }
  })
  return (
    <ScrollView style={styles.container} horizontal>
      {contentsItems}
    </ScrollView>
  )
}

FeedContents.propTypes = {
  items: PropTypes.any,
}

FeedContents.defaultProps = {
  items: [],
}

export default FeedContents
