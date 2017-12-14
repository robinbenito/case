import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Typography, Units } from '../../../constants/Style'

import LargeButton from '../../../components/UI/Buttons/LargeButton'
import { H2 } from '../../../components/UI/Texts'

const Description = styled.View`
`

const Headline = styled(H2)`
  width: 100%;
  text-align: center;
  color: black;
`

const Blurb = styled.Text`
  width: 100%;
  text-align: center;
  color: black;
  font-size: ${Typography.fontSize.smedium};
  line-height: ${Typography.lineHeightFor('smedium', 'compact')};
  margin-vertical: ${Units.base};
`

export default class SlideDescription extends Component {
  static propTypes = {
    title: PropTypes.string,
    blurb: PropTypes.string,
    button: PropTypes.string,
    next: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: null,
    blurb: null,
    button: null,
  }

  render() {
    const { title, blurb, button, next } = this.props

    return (
      <Description>
        {title &&
          <Headline>
            {title}
          </Headline>
        }

        {blurb &&
          <Blurb>
            {blurb}
          </Blurb>
        }

        {button &&
          <LargeButton color="black" onPress={next}>
            {button}
          </LargeButton>
        }
      </Description>
    )
  }
}
