import React from 'react'
import {
  Easing,
  Dimensions,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel'

import BlockItem from '../../../components/BlockItem'
import UserAvatar from '../../../components/UserAvatar'

import layout from '../../../constants/Layout'

const FeedContents = ({ items }) => {
  const contentsItems = items.map((item) => {
    let objectItem = null
    if (item) {
      const { __typename } = item
      switch (__typename) {
        case 'Connectable':
          objectItem = <BlockItem size="1-up" block={item} key={item.id} />
          break
        case 'User':
          objectItem = <UserAvatar user={item} key={item.id} mode="feed" />
          break
        default:
          objectItem = <Text key={`klass-${item.id}`} >{item.id}</Text>
          break
      }
      return objectItem
    }
    return null
  })

  const { width } = Dimensions.get('window')
  const sliderWidth = width - (layout.padding * 2)
  const itemWidth = sliderWidth - (layout.padding * 2)

  return (
    <Carousel
      ref={(carousel) => { this.Carousel = carousel }}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      activeSlideOffset={20}
      inactiveSlideScale={1}
      scrollEndDragDebounceValue={10}
      decelerationRate={1}
      animationOptions={{ duration: 100, easing: Easing.sin }}
    >
      {contentsItems}
    </Carousel>
  )
}

FeedContents.propTypes = {
  items: PropTypes.any,
}

FeedContents.defaultProps = {
  items: [],
}

export default FeedContents
