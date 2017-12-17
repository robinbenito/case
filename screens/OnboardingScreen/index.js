import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components/native'
import { Easing } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { values } from 'lodash'
import { graphql } from 'react-apollo'

import StatusBarAwareContainer from '../../components/UI/Layout/StatusBarAwareContainer'
import SlideDescription from './components/SlideDescription'
import SlideNavigation from './components/SlideNavigation'

import navigationService from '../../utilities/navigationService'
import cacheAssetsAsync from '../../utilities/cacheAssetsAsync'
import { trackEvent } from '../../utilities/analytics'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

import onboardingQuery from './queries/onboarding'
import onboardingMeFragment from './fragments/onboardingMe'

import { Units } from '../../constants/Style'

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

class OnboardingScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(onboardingMeFragment).isRequired,
    }),
  }

  static defaultProps = {
    data: {},
  }

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

  onSnapToItem = (index) => {
    trackEvent({
      category: 'Onboarding',
      action: 'Advance slide',
      label: 'Slide index',
      value: index,
    })
    this.setState({ index })
  }

  isAtEnd = () =>
    this.state.index === this.state.last

  next = () => {
    if (this.isAtEnd()) return this.done()
    this.Carousel.snapToNext()
  }

  done = () => {
    const { data: { me: { feed: { total } } } } = this.props
    const location = total > 0 ? ['feed'] : ['explore', { showHeadline: true }]

    trackEvent({
      category: 'Onboarding',
      action: 'Done',
    })

    navigationService.reset(...location)
  }

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

        <SlideNavigation
          index={index}
          last={last}
          done={this.done}
          next={this.next}
        />
      </StatusBarAwareContainer>
    )
  }
}

export default graphql(onboardingQuery)(withLoadingAndErrors(OnboardingScreen))
