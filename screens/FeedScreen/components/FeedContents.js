import React from 'react'
import { Easing, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'

import NavigationService from '../../../utilities/navigationService'

import BlockItem from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import UserAvatar from '../../../components/UserAvatar'

import { Units, Border } from '../../../constants/Style'

const Block = styled(BlockItem)`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
`

const Container = styled.View`
  flexGrow: 1;
  flex-wrap: wrap;
`

const WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = (WIDTH * 0.85) + Units.scale[2]

const renderItem = ({ item }) => {
  let objectItem = null
  if (item) {
    const { __typename } = item
    switch (__typename) {
      case 'Connectable':
        objectItem = (
          <Block
            size="1-up"
            block={item}
            key={item.id}
          />
        )
        break
      case 'Channel':
        objectItem = <ChannelItem channel={item} key={item.id} />
        break
      case 'User':
        objectItem = (
          <UserAvatar
            user={item}
            key={item.id}
            size={90}
            mode="feed"
            onPress={() => NavigationService.navigate('profile', {
              id: item.id,
              title: item.name,
            })}
            style={{ margin: Units.scale[2] }}
            includeName
          />
        )
        break
      default:
        break
    }
    return objectItem
  }
  return null
}

const FeedContents = ({ items, verb }) => {
  const itemData = items.slice().reverse()

  const { __typename } = items[0]
  const channelGroup = __typename === 'Channel'
  const userGroup = __typename === 'User'
  const showSlider = verb === 'connected' && items.length > 1 && !channelGroup

  if (showSlider) {
    return (
      <Carousel
        ref={(carousel) => { this.Carousel = carousel }}
        sliderWidth={WIDTH}
        itemWidth={ITEM_WIDTH}
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
