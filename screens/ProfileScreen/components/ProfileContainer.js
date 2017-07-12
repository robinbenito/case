import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ProfileHeader from './ProfileHeader'
import ContentsWithData from '../../../components/Contents/ContentsContainer'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
})

export class ProfileContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'Channels',
    }
  }

  render() {
    if (this.props.data.error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Profile not found
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
      <View>
        <ProfileHeader user={this.props.data.user} />
        <ContentsWithData
          objectId={this.props.userId}
          objectType="USER"
          type="channel"
          page={1}
        />
      </View>
    )
  }
}

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

ProfileContainer.propTypes = {
  data: PropTypes.any.isRequired,
  userId: PropTypes.string.isRequired,
}

export const ProfileContainerWithData = graphql(ProfileQuery, {
  options: ({ userId }) => ({ variables: { userId } }),
})(ProfileContainer)

