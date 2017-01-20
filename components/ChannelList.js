import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView
} from 'react-native';

import ChannelItem from './ChannelItem';

export default class ChannelList extends Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.channels || []),
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loading) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.channels)
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderHeader={this.props.renderHeader}
          renderScrollComponent={props => <ScrollView {...props} />}
          renderRow={(channel) => {
            return (
              <ChannelItem channel={channel}/>
            )
          }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20
  }
});