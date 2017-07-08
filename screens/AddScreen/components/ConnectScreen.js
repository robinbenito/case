import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import { RecentConnectionsWithData } from '../../../components/RecentConnections';
import { ConnectionSearchWithData } from '../../../components/ConnectionSearch';

import colors from '../../../constants/Colors';
import layout from '../../../constants/Layout';

export default class ConnectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      q: null,
    };
  }

  search(text) {
    this.setState({
      isSearching: text.length,
      search: text,
    });
  }

  render() {
    const { text, image } = this.props;
    const { height, width } = Dimensions.get('window');
    const { search } = this.state;

    const imageStyle = {
      width: width - (layout.padding * 2),
      height: width - (layout.padding * 2),
      resizeMode: 'contain',
      marginTop: (layout.padding / 2),
      borderWidth: 1,
      borderColor: colors.gray.border,
    };

    const ConnectionContent = this.state.isSearching ? <ConnectionSearchWithData q={search} /> : <RecentConnectionsWithData />;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          <Image
            source={{ uri: image }}
            style={imageStyle}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.search(text)}
            autoCapitalize="none"
          />
          <Text style={styles.label}>Recent channels</Text>
          {ConnectionContent}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: layout.padding,
  },
  label: {
    fontSize: 12,
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderRadius: 0.125,
    fontSize: 12,
    backgroundColor: '#f7f7f7',
    color: '#585858',
    borderColor: '#cbcbcb',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    padding: (layout.padding / 2),
  },
});
