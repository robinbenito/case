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

export default class ContentsList extends Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.contents || []),
    };
    this.loadAnotherPage = this.loadAnotherPage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loading) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.contents)
    })
  }

  loadAnotherPage() {
    console.log('loading another page', this);
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
        onEndReached={this.loadAnotherPage.bind(this)}
      />
    );
  }

}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});