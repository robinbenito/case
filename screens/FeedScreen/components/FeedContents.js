import React from 'react'
import { Easing } from 'react-native'
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'
import NavigationService from '../../../utilities/navigationService'
import BlockItem, { BLOCK_SIZES } from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import UserAvatar from '../../../components/UserAvatar'
import { Units } from '../../../constants/Style'

const Container = styled.View`
  flexGrow: 1;
  flex-wrap: wrap;
`

const SLIDER_WIDTH = Units.window.width
const SLIDER_ITEM_WIDTH = BLOCK_SIZES['1-up'] - (Units.scale[1] * 2)

const renderItem = ({ item }) => {
  let component = null

  if (item) {
    const { __typename } = item
    switch (__typename) {
      case 'Connectable':
        component = (
          <BlockItem
            size="1-up"
            block={item}
            key={item.id}
            style={{
              marginHorizontal: Units.scale[1],
            }}
          />
        )
        break
      case 'Channel':
        component = <ChannelItem channel={item} key={item.id} />
        break
      case 'User':
        component = (
          <UserAvatar
            includeName
            user={item}
            key={item.id}
            size={90}
            mode="feed"
            onPress={() => NavigationService.navigate('profile', {
              id: item.id,
              title: item.name,
            })}
            style={{
              marginHorizontal: Units.scale[2],
              marginBottom: Units.scale[2],
            }}
          />
        )
        break
      default:
        break
    }

    return component
  }

  return null
}

const FeedContents = ({ items, verb }) => {
  const itemData = items.slice().reverse()

  const __typename = items[0] && items[0].__typename
  const channelGroup = __typename === 'Channel'
  const userGroup = __typename === 'User'
  const showSlider = verb === 'connected' && items.length > 1 && !channelGroup

  if (showSlider) {
    return (
      <Carousel
        ref={carousel => this.Carousel = carousel}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_ITEM_WIDTH + Units.base}
        activeSlideOffset={1}
        inactiveSlideScale={1}
        renderItem={renderItem}
        data={itemData}
        scrollEndDragDebounceValue={50}
        contentContainerCustomStyle={{ justifyContent: 'flex-start' }}
        animationOptions={{ duration: 100, easing: Easing.sin }}
        slideStyle={{ justifyContent: 'flex-start' }}
      />
    )
  }

  const flexDirection = channelGroup ? 'column' : 'row'
  const justifyContent = userGroup ? 'flex-start' : 'center'
  const contentsItems = itemData.map((item, index) => renderItem({ item, index }))

  return (
    <Container style={{ flexDirection, justifyContent, flex: 1 }}>
      {contentsItems}
    </Container>
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
