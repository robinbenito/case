import React from 'react'
import PropTypes from 'prop-types'
import { WebBrowser } from 'expo'

import styled from 'styled-components/native'
import { Colors, Typography } from '../../constants/Style'

export const Link = styled.Text`
  font-weight: ${Typography.fontWeight.bold};
  color: ${Colors.semantic.text};
  font-size: ${Typography.fontSize.xsmall};
  line-height: ${Typography.fontSize.xsmall * Typography.lineHeight.compact};
`

export class ExternalLink extends React.Component {
  constructor(props) {
    super(props)
    this.openBrowser = this.openBrowser.bind(this)
  }

  openBrowser() {
    const { url } = this.props
    if (url) {
      WebBrowser.openBrowserAsync(url)
    }
  }

  render() {
    const { children } = this.props
    return (
      <Link onPress={this.openBrowser}>{children}</Link>
    )
  }
}

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.any,
}

ExternalLink.defaultProps = {
  children: null,
}
