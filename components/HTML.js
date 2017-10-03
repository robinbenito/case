import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import styled from 'styled-components/native'
import HTMLView from 'react-native-htmlview'
import { Typography, Units } from '../constants/Style'

const STYLESHEET = {
  p: {
    fontFamily: 'System',
    fontSize: Typography.fontSize.small,
    lineHeight: Typography.lineHeightFor(Typography.fontSize.small),
    marginBottom: Units.scale[1],
  },
  a: {},
}

const ArenaHTML = styled(HTMLView).attrs({
  addLineBreaks: false,
})`
  margin-bottom: ${-Units.scale[1]};
`

const HTML = ({ stylesheet, ...rest }) => (
  <ArenaHTML
    stylesheet={merge({}, stylesheet, STYLESHEET)}
    {...rest}
  />
)

HTML.propTypes = {
  stylesheet: PropTypes.any,
}

HTML.defaultProps = {
  stylesheet: {},
}

export default HTML
