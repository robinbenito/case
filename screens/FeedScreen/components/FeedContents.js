import React from 'react'
import {
  Easing,
  Dimensions,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel'

import NavigationService from '../../../utilities/navigationService'

import BlockItem from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import UserAvatar from '../../../components/UserAvatar'

import layout from '../../../constants/Layout'

const FeedContents = ({ items, verb }) => {
  const contentsItems = items.map((item) => {
    let objectItem = null
    if (item) {
      const { __typename } = item
      switch (__typename) {
        case 'Connectable':
          objectItem = <BlockItem size="1-up" block={item} key={item.id} />
          break
        case 'Channel':
          objectItem = <ChannelItem channel={item} key={item.id} />
          break
        case 'User':
          objectItem = (
            <UserAvatar
              user={item}
              key={item.id}
              mode="feed"
              onPress={() => NavigationService.navigateToProfile(item.id)}
              style={{ marginRight: layout.padding }}
            />
          )
          break
        default:
          objectItem = <Text key={`klass-${item.id}`} >{item.id}</Text>
          break
      }
      return objectItem
    }
    return null
  })

  const { __typename } = items[0]
  const channelGroup = __typename === 'Channel'
  const { width } = Dimensions.get('window')
  const sliderWidth = width - (layout.padding * 2)
  const itemWidth = sliderWidth - (layout.padding * 2)
  const showSlider = verb === 'connected' && items.length > 1 && !channelGroup

  if (showSlider) {
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

  const flexDirection = channelGroup ? 'column' : 'row'

  return (
    <View style={{ marginLeft: layout.padding, flexDirection }}>
      {contentsItems}
    </View>
  )
}

FeedContents.propTypes = {
  items: PropTypes.any,
  verb: PropTypes.string.isRequired,
}

FeedContents.defaultProps = {
  items: [],
}

export default FeedContents
