import React from 'react'
import PropTypes from 'prop-types'
import { WebBrowser } from 'expo'
import { Text } from 'react-native'

export default class ExternalLink extends React.Component {
  openBrowser = () => {
    const { url } = this.props
    if (url) WebBrowser.openBrowserAsync(url)
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <Text onPress={this.openBrowser} {...rest}>
        {children}
      </Text>
    )
  }
}

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
