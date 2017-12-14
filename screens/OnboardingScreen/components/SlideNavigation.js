import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import SmallButton from './SmallButton'

import { Colors, Typography, Units } from '../../../constants/Style'

const Container = styled.View`
  width: 100%;
  height: 10%;
`

const Count = styled.Text`
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.small};
`

const Footer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: ${x => (x.centered ? 'center' : 'space-between')};
  align-items: center;
  align-content: center;
  padding-vertical: ${Units.base};
  padding-horizontal: ${Units.base};
`

export default class SlideNavigation extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
  }

  isAtBeginning = () =>
    this.props.index === 0

  isProgressing = () =>
    this.props.index >= 1 && this.props.index < this.props.last

  isAtEnd = () =>
    this.props.index === this.props.last

  render() {
    const { index, last, next, done, ...rest } = this.props

    return (
      <Container {...rest}>
        {this.isAtBeginning() &&
          <Footer centered>
            <SmallButton onPress={done}>
              Skip
            </SmallButton>
          </Footer>
        }

        {this.isProgressing() &&
          <Footer>
            <SmallButton onPress={done}>
              Skip
            </SmallButton>

            <Count>
              {index} / {last}
            </Count>

            <SmallButton color="black" onPress={next}>
              Next &rarr;
            </SmallButton>
          </Footer>
        }

        {this.isAtEnd() &&
          <Footer />
        }
      </Container>
    )
  }
}
