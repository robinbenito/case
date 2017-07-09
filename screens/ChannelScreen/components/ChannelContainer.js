import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'

import ChannelHeader from './ChannelHeader'
import { ContentsWithData } from '../../../components/Contents/ContentsContainer'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import layout from '../../../constants/Layout'

export default class ChannelContainer extends React.Component {
  render() {
    if (this.props.data.error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Channel not found
          </Text>
        </View>
      )
    }

    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <ChannelHeader channel={this.props.data.channel} />
        <ContentsWithData
          objectId={this.props.data.channel.slug}
          objectType="CHANNEL"
          type="block"
          page={1}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
})

const ChannelQuery = gql`
  query ChannelQuery($id: ID!){
    channel(id: $id) {
      id
      slug
      title
      visibility
      user {
        name
        slug
      }
      counts {
        blocks
      }
      collaborators {
        name
        slug
      }
      visibility
    }
  }
`

export const ChannelContainerWithData = graphql(ChannelQuery)(ChannelContainer)
