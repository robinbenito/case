import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Easing } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { values } from 'lodash'

import StatusBarAwareContainer from '../../components/UI/Layout/StatusBarAwareContainer'
import SmallButton from './components/SmallButton'
import SlideDescription from './components/SlideDescription'

import navigationService from '../../utilities/navigationService'
import cacheAssetsAsync from '../../utilities/cacheAssetsAsync'

import { Colors, Typography, Units } from '../../constants/Style'

import DATA from './data'
import IMAGES from './images'

const Container = styled.View`
  justify-content: space-between;
  flex: 1;
`

const TopMessage = styled.View`
  flex: 1;
  width: 65%;
  align-self: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: ${Units.base};
`
const CenterMessage = styled(TopMessage)`
  justify-content: center;
`

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 65%;
`

const Count = styled.Text`
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.small};
`

const Footer = styled.View`
  width: 100%;
  height: 10%;
  flex-direction: row;
  justify-content: ${x => (x.centered ? 'center' : 'space-between')};
  align-items: center;
  align-content: center;
  padding-vertical: ${Units.base};
  padding-horizontal: ${Units.base};
`

export default class OnboardingScreen extends Component {
  constructor(props) {
    super(props)

    // Don't bother waiting since the first
    // slide doesn't have an image
    cacheAssetsAsync(values(IMAGES))
  }

  state = {
    index: 0,
    last: DATA.length - 1,
  }

  onSnapToItem = index =>
    this.setState({ index })

  isAtBeginning = () =>
    this.state.index === 0

  isProgressing = () =>
    this.state.index >= 1 && this.state.index < this.state.last

  isAtEnd = () =>
    this.state.index === this.state.last

  next = () => {
    if (this.isAtEnd()) return this.done()
    this.Carousel.snapToNext()
  }

  done = () =>
    navigationService.reset('feed')

  renderItem = ({ item: { image, ...rest } }) => {
    const Message = image ? TopMessage : CenterMessage

    return (
      <Container>
        <Message>
          <SlideDescription
            next={this.next}
            {...rest}
          />
        </Message>

        {image &&
          <Image source={image} />
        }
      </Container>
    )
  }

  render() {
    const { index, last } = this.state

    return (
      <StatusBarAwareContainer>
        <Carousel
          ref={carousel => this.Carousel = carousel}
          sliderWidth={Units.window.width}
          itemWidth={Units.window.width}
          slideStyle={{ width: Units.window.width }}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          scrollEndDragDebounceValue={50}
          animationOptions={{ duration: 100, easing: Easing.sin }}
          data={DATA}
          renderItem={this.renderItem}
          onSnapToItem={this.onSnapToItem}
        />

        {this.isAtBeginning() &&
          <Footer centered>
            <SmallButton onPress={this.done}>
              Skip
            </SmallButton>
          </Footer>
        }

        {this.isProgressing() &&
          <Footer>
            <SmallButton onPress={this.done}>
              Skip
            </SmallButton>

            <Count>
              {index} / {last}
            </Count>

            <SmallButton color="black" onPress={this.next}>
              Next &rarr;
            </SmallButton>
          </Footer>
        }

        {this.isAtEnd() &&
          <Footer />
        }
      </StatusBarAwareContainer>
    )
  }
}
