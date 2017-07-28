import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import ChannelItem from '../ChannelItem'
import BlockItem from '../BlockItem'

import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingRight: layout.padding,
    paddingLeft: layout.padding,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})

export default class ContentsList extends Component {
  render() {
    const columnCount = this.props.type === 'Channels' ? 1 : 2
    const { data, loadMore, contentsKey } = this.props

    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={data[contentsKey]}
        refreshing={data.networkStatus === 4}
        numColumns={columnCount}
        keyExtractor={item => item.klass + item.id}
        key={this.props.type}
        onRefresh={() => data.refetch()}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadMore(data.variables.page + 1)}
        ListHeaderComponent={this.props.renderHeader}
        renderItem={({ item }) => {
          if (item.klass === 'Block') {
            return <BlockItem block={item} />
          }
          return <ChannelItem channel={item} />
        }}
      />
    )
  }
}

ContentsList.propTypes = {
  renderHeader: PropTypes.func,
  data: PropTypes.any.isRequired,
  contentsKey: PropTypes.string.isRequired,
  type: PropTypes.string,
  loadMore: PropTypes.func,
}

ContentsList.defaultProps = {
  renderHeader: () => null,
  type: 'Channel',
  refetch: () => null,
  refreshing: false,
  loadMore: () => null,
}
