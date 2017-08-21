import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ChannelItem from '../../../components/ChannelItem'

import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    padding: layout.padding / 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
})

class BlockConnections extends React.Component {
  constructor(props) {
    super(props)
    this.renderLoader = this.renderLoader.bind(this)
  }

  renderLoader() {
    if (!this.props.data.loading) return null
    return (
      <ActivityIndicator animating size="small" style={styles.footer} />
    )
  }

  render() {
    const { data } = this.props
    const contents = data.block && data.block.channels
    const { error, loading } = data

    if (error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Error loading block connections
          </Text>
        </View>
      )
    }

    if (loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.container}
        data={contents}
        refreshing={data.networkStatus === 4}
        keyExtractor={item => item.id}
        onRefresh={this.onRefresh}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
        renderItem={({ item }) => (
          <ChannelItem channel={item} />
        )}
      />
    )
  }
}

BlockConnections.propTypes = {
  data: PropTypes.any.isRequired,
}

const BlockQuery = gql`
  query BlockQuery($id: ID!){
    block(id: $id) {
      __typename
      id
      channels {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

const BlockConnectionsWithData = graphql(BlockQuery)(BlockConnections)

export default BlockConnectionsWithData
