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
import ContentsList from './ContentsList'

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
    this._onEndReached = this._onEndReached.bind(this);
  }

  _onToggleChange(value) {
    const typeValue = {
      'Blocks': 'block',
      'Channels': 'channel',
    }[value];

    this.setState({ type: value });
    this.props.data.refetch({ type: typeValue })
  }

  _onEndReached(){
    console.log('onendreached')
    console.log('onendreached', this)
  }

  shouldComponentUpdate(newProps) {
    if (newProps.data && newProps.data.loading) { return false; }
    return true;
  }

  render() {
    console.log('render contents')
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
          <ContentsToggle 
            selectedSegment={this.state.type} 
            onToggleChange={this._onToggleChange}
          />
        </View>
        <ContentsList 
          contents={this.props.data.search} 
          type={this.state.type} 
          onEndReached={this._onEndReached.bind(this)}
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
  query ContentsQuery($type: String!, $objectId: String, $objectType: ObjectType, $page: Int){
    search(object_id: $objectId, object_type: $objectType, per: 10, page: $page type: $type) {
      id
      title
      updated_at(relative: true)
      user {
        name
      }
      klass
      kind {
        __typename
        ... on Text {
          content
        }
        ... on Image {
          image_url(size: DISPLAY)
        }
        ... on Link {
          image_url(size: DISPLAY)
        }
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
  options: ({ objectId, objectType, type, page }) => {
    return { variables: {  objectId, objectType, type, page } };
  },
  props: (props) => {
    let data = props.data;
    return {
      data, 
      loadMore() {
        return props.data.fetchMore({
          variables: {
            page: 2
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            console.log('updateQuery')
            if (!fetchMoreResult.data) { return previousResult; }
            return Object.assign({}, previousResult, {
              search: [...previousResult.data.search, ...fetchMoreResult.data.search],
            });
          }
        })
      }
    };
  },
})(ContentsContainer);