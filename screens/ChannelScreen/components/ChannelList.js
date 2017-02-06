import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView
} from 'react-native';

import ChannelItem from '../ChannelItem'
import BlockItem from '../BlockItem'

export default class ChannelList extends Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.contents || []),
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loading) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.contents)
    })
  }

  render() {
    const flexStyle = {
      'Channels': {
        flexDirection: 'column'
      },
      'Blocks': {
        flexDirection: 'row'
      }
    }[this.props.type];

    return (
      <ListView
        style={{flex: 1}}
        contentContainerStyle={[styles.listContainer, flexStyle]}
        dataSource={this.state.dataSource}
        renderHeader={this.props.renderHeader}
        renderRow={(item) => {
          if (item.klass == "Block") {
            return (<BlockItem block={item}/>);
          }
          return (<ChannelItem channel={item}/>);
        }}
        onEndReached={this.props.onEndReached}
      />
    );
  }

}

const ChannelQuery = gql`
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

export const ChannelWithData = graphql(ChannelQuery, { 
  options: ({ objectId, objectType, type, page }) => {
    return { variables: {  objectId, objectType, type, page } };
  },
  props: (props) => {
    let data = props.data;
    return {
      data, 
      loadMore(page) {
        return props.data.fetchMore({
          variables: {
            page: page
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return previousResult; }
            return Object.assign({}, previousResult, {
              search: [...previousResult.search, ...fetchMoreResult.data.search],
            });
          }
        })
      }
    };
  },
})(ChannelList);

