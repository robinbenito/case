import React, { Component } from 'react'
import { Easing } from 'react-native'
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'

import navigationService from '../../../utilities/navigationService'

import BlockItem, { BLOCK_SIZES } from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import UserAvatar from '../../../components/UserAvatar'

import { Units } from '../../../constants/Style'

const Container = styled.View`
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: ${x => (x.mode === 'channel' ? 'column' : 'row')};
  justify-content: ${x => (x.mode === 'user' ? 'flex-start' : 'center')};
  padding-horizontal: ${x => (x.mode === 'user' ? Units.scale[2] : 0)};
`

const SLIDER_WIDTH = Units.window.width
const SLIDER_ITEM_WIDTH = BLOCK_SIZES['1-up'] - (Units.scale[1] * 2)

export default class FeedContents extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: Should be a fragment
    verb: PropTypes.string.isRequired,
  }

  static defaultProps = {
    items: [],
  }

  renderItem = ({ item }) => {
    let component = null

    if (item) {
      const { __typename } = item
      const key = [item.__typename, item.id].join('-')

      switch (__typename) {
        case 'Connectable':
          component = (
            <BlockItem
              size="1-up"
              block={item}
              key={key}
              style={{
                marginHorizontal: Units.scale[1],
              }}
            />
          )
          break
        case 'Channel':
          component = <ChannelItem channel={item} key={key} />
          break
        case 'User':
          component = (
            <UserAvatar
              includeName
              user={item}
              key={key}
              size={90}
              mode="feed"
              onPress={() => navigationService.navigate('profile', {
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

  render() {
    const { items, verb } = this.props

    // TODO: Clean up this in GraphQL response
    const itemData = items.slice().reverse()
    const __typename = items[0] && items[0].__typename
    const isSwipeable = verb === 'connected'
      && items.length > 1
      && __typename !== 'Channel'

    if (isSwipeable) {
      return (
        <Carousel
          ref={carousel => this.Carousel = carousel}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_ITEM_WIDTH + Units.base}
          activeSlideOffset={1}
          inactiveSlideScale={1}
          renderItem={this.renderItem}
          data={itemData}
          scrollEndDragDebounceValue={50}
          contentContainerCustomStyle={{ justifyContent: 'flex-start' }}
          animationOptions={{ duration: 100, easing: Easing.sin }}
          slideStyle={{ justifyContent: 'flex-start' }}
        />
      )
    }

    return (
      <Container mode={__typename.toLowerCase()}>
        {itemData.map((item, index) => this.renderItem({ item, index }))}
      </Container>
    )
  }

}
