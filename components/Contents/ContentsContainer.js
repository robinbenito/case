import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  ScrollView,
  Text,
  Image
} from 'react-native';

import ContentsToggle from './ContentsToggle'
import ChannelList from '../ChannelList'

import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import HTMLView from 'react-native-htmlview'

@withApollo
class ContentsContainer extends Component {
  state = {
    type: "Channels"
  }

  constructor(props) {
    super(props)
    this._onToggleChange = this._onToggleChange.bind(this);
  }

  _onToggleChange(value) {
    const typeValue = {
      'Blocks': 'block',
      'Channels': 'channel',
    }[value];

    this.setState({ type: value });
    this.props.data.refetch({ type: typeValue })
  }

  shouldComponentUpdate(newProps) {
    if (newProps.data && newProps.data.loading) { return false; }
    return true;
  }

  render() {
    if (this.props.data.error) {
      console.log('ContentsContainer -> Error', this.props.data.error)
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Profile not found
          </Text>
        </View>
      );
    }
    
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.toggleContainer}>
          <ContentsToggle selectedSegment={this.state.type} onToggleChange={this._onToggleChange}/>
        </View>
        <ChannelList 
          channels={this.props.data.search} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
});

const ContentsQuery = gql`
  query ContentsQuery($type: String!, $objectId: String, $objectType: ObjectType){
    search(object_id: $objectId, object_type: $objectType, per: 10, type: $type) {
      id
      title
      updated_at(relative: true)
      user {
        name
      }
      kind {
        ... on Channel {
          visibility
          counts{
            blocks
          }
        }
      }
    }
  }
`

export const ContentsWithData = graphql(ContentsQuery, { 
  options: ({ objectId, objectType, type }) => {
    return { variables: {  objectId, objectType, type } };
  },
})(ContentsContainer);