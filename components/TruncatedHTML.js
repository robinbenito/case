import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo'
import HTML from './HTML'
import { Typography, Units } from '../constants/Style'

const Container = styled.View`
  height: 100%;
`

const FadedHTML = styled(HTML)`
  padding-vertical: ${Units.scale[1]};
  padding-horizontal: ${Units.scale[2]};
  height: 100%;
  overflow: hidden;
`

const Fade = styled(LinearGradient).attrs({
  colors: ['rgba(255,255,255,0)', 'white'],
})`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${x => Typography.lineHeightFor('base') * x.numberOfFadedLines};
`

const TruncatedHTML = ({ numberOfFadedLines, ...rest }) => (
  <Container>
    <FadedHTML {...rest} />
    <Fade numberOfFadedLines={numberOfFadedLines} />
  </Container>
)

TruncatedHTML.propTypes = {
  numberOfFadedLines: PropTypes.number.isRequired,
}

TruncatedHTML.defaultProps = {
  numberOfFadedLines: 1,
}

export default TruncatedHTML
