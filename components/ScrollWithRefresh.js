import React from 'react'
import PropTypes from 'prop-types'
import { RefreshControl, ScrollView } from 'react-native'

const ScrollViewWithRefresh = ({ children, refreshing, onRefresh, ...rest }) => (
  <ScrollView
    contentContainerStyle={{ backgroundColor: 'white' }}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    {...rest}
  >
    {children}
  </ScrollView>
)

ScrollViewWithRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
}

ScrollViewWithRefresh.defaultProps = {
  onRefresh: () => null,
  refreshing: false,
}

export default ScrollViewWithRefresh
