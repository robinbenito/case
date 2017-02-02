import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

import ProfileHeader from './ProfileHeader';
import { ContentsWithData } from '../../../components/Contents/ContentsContainer';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export class ProfileContainer extends React.Component {
  state = {
    type: "Channels"
  }

  render() {
    if (this.props.data.error) {
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
      <View>
        <ProfileHeader user={this.props.data.user} />
        <ContentsWithData objectId={this.props.userId} objectType="USER" type="channel"/>
      </View>
    );
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
    padding: 20
  },
});

const ProfileQuery = gql`
  query ProfileQuery($userId: ID!){
    user(id: $userId) {
      id
      initials
      name
      avatar(size: LARGE)
      bio
    }
  }
`

export const ProfileContainerWithData = graphql(ProfileQuery, { 
  options: ({ userId }) => {
    return { variables: { userId: userId } };
  },
})(ProfileContainer);