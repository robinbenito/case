import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'

import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'

import ChannelHeader from './ChannelHeader'
import ContentsWithData from '../../../components/Contents/ContentsContainer'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
})

class ChannelContainer extends React.Component {
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
          sort_by="POSITION"
          direction="DESC"
        />
      </ScrollView>
    )
  }
}

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

ChannelContainer.propTypes = {
  data: propType(ChannelQuery).isRequired,
}

const ChannelContainerWithData = graphql(ChannelQuery)(ChannelContainer)

export default ChannelContainerWithData
