import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const { width, height } = Dimensions.get('window');

import Colors from '../constants/Colors';

export default class BlockItem extends Component {
  
  _onPressButton() {
    // this.props.navigator.push(Router.getRoute('block', { id: this.props.block.id }));
  }
  
  render() {
    let blockInner;

    switch (this.props.block.kind.__typename) {
      case "Link":
      case "Image":
        blockInner = (
          <Image style={styles.image} source={{ uri: this.props.block.kind.image_url }} />
        )
        break;
      case "Text":
        blockInner = (
          <Text style={styles.channelTitle} numberOfLines={9}>
            {this.props.block.kind.content}
          </Text>
        );
        break;
    
      default:
        blockInner = (
          <Text style={styles.channelTitle}>
            {this.props.block.title}
          </Text>
        );
        break;
    }

    return (
      <TouchableOpacity onPress={this._onPressButton.bind(this)} style={styles.container}>
        <View style={{flex: 1}}>{blockInner}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    padding: 15,
    marginBottom: 20,
    width: (width / 2) - 30,
    height: (width / 2) - 30,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: (width / 2) - 30,
    height: (width / 2) - 30,
    alignSelf: 'center'
  },
  channelTitle: {
    fontSize: 12,
    color: '#000',
  },
});