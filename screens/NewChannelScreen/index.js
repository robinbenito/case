import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
  StyleSheet,
  View,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SettingsList from 'react-native-settings-list'
import { NavigationActions } from 'react-navigation'
import Store from '../../state/Store'
import { TOGGLE_ADD_MENU } from '../../state/actions'

import FieldSet from '../../components/FieldSet'
import BackButton from '../../components/BackButton'
import HeaderRightButton from '../../components/HeaderRightButton'

import NavigatorService from '../../utilities/navigationService'

import layout from '../../constants/Layout'
import colors from '../../constants/Colors'
import { Colors } from '../../constants/Style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.background,
  },
  fieldset: {
    marginTop: layout.padding * 2,
  },
})

const navigationOptions = {
  title: 'New Channel',
  headerLeft: (<BackButton />),
}

class NewChannelScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      visibility: 'CLOSED',
    }
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.goToChannelVisibilityScreen = this.goToChannelVisibilityScreen.bind(this)
    this.onVisibilityChange = this.onVisibilityChange.bind(this)
  }

  componentDidUpdate() {
    // Hide or show the done button depending on if content is present
    if (this.state.title) {
      this.setNavOptions({
        headerRight: (
          <HeaderRightButton onPress={this.onSubmit} text="Save" />
        ),
      })
    } else {
      this.setNavOptions({
        headerRight: null,
      })
    }
  }

  onFieldChange(key, value) {
    this.setState({
      [key]: value,
    })
  }

  onVisibilityChange(value) {
    this.setState({ visibility: value.toUpperCase() })
  }

  onSubmit() {
    this.props.mutate({ variables: this.state }).then((response) => {
      const { data } = response
      if (!data.error) {
        const { create_channel: { channel: { id, title, visibility } } } = data
        Store.dispatch({ type: TOGGLE_ADD_MENU })
        NavigatorService.navigate('channel', { id, title, color: Colors.channel[visibility] })
      }
    })
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  goToChannelVisibilityScreen() {
    const { visibility } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'channelVisibility',
      params: { visibility, onVisibilityChange: this.onVisibilityChange },
    })

    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    const { visibility } = this.state
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.container}>
          <FieldSet
            isFirst
            label="Title / Description"
            onChange={this.onFieldChange}
            style={styles.fieldset}
            fields={[
              {
                key: 'title',
                placeholder: 'Title',
              },
              {
                key: 'description',
                placeholder: 'Description',
              },
            ]}
          />
          <SettingsList borderColor={colors.gray.background}>
            <SettingsList.Header headerText="" />
            <SettingsList.Item
              title="Privacy"
              titleInfo={visibility.charAt(0).toUpperCase() + visibility.substr(1).toLowerCase()}
              titleInfoStyle={{ color: Colors.channel[visibility.toLowerCase()] }}
              onPress={this.goToChannelVisibilityScreen}
            />
          </SettingsList>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

NewChannelScreen.propTypes = {
  navigation: PropTypes.any,
  mutate: PropTypes.any.isRequired,
}

NewChannelScreen.defaultProps = {
  navigation: () => null,
}

const createChannelMutation = gql`
  mutation createChannelMutation($title: String!, $description: String, $visibility: ChannelVisibility){
    create_channel(input: { title: $title, description: $description, visibility: $visibility }) {
      clientMutationId
      channel {
        id
        title
        visibility
      }
    }
  }
`

const NewChannelScreenWithData = graphql(createChannelMutation)(NewChannelScreen)

export default NewChannelScreenWithData
