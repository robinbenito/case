import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import { Ionicons } from '@exponent/vector-icons';

@withNavigation
export default class BackButton extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="md-return-left" size={24} color="black" onPress={this._goBack}/>
      </View>
    )
  }

  _goBack = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.props.navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
});