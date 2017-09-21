import React from 'react'
import PropTypes from 'prop-types'
import { RefreshControl, ScrollView } from 'react-native'

import { Units } from '../constants/Style'

const ScrollViewWithRefresh = ({ children, refreshing, onRefresh }) => (
  <ScrollView
    contentContainerStyle={{
      backgroundColor: 'white',
      paddingBottom: Units.scale[4],
    }}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
  >
    {children}
  </ScrollView>
)

ScrollViewWithRefresh.propTypes = {
  children: PropTypes.any.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
}

ScrollViewWithRefresh.defaultProps = {
  onRefresh: () => null,
  refreshing: false,
}

export default ScrollViewWithRefresh
