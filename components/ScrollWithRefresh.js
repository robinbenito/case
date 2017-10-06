import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RefreshControl, ScrollView } from 'react-native'

export default class ScrollViewWithRefresh extends Component {
  render() {
    const { children, refreshing, onRefresh, ...rest } = this.props

    return (
      <ScrollView
        contentContainerStyle={{ backgroundColor: 'white' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ref={ref => this.ScrollView = ref}
        {...rest}
      >
        {children}
      </ScrollView>
    )
  }
}

ScrollViewWithRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
}

ScrollViewWithRefresh.defaultProps = {
  onRefresh: () => null,
  refreshing: false,
}
