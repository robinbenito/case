import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SettingsList from 'react-native-settings-list'
import { Ionicons } from '@expo/vector-icons'

import BackButton from './BackButton'

import layout from '../constants/Layout'
import type from '../constants/Type'
import colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.background,
  },
  fieldset: {
    marginTop: layout.padding * 2,
  },
  labelContainer: {
    paddingTop: layout.padding,
    paddingLeft: layout.padding * 2,
  },
  label: {
    fontSize: type.sizes.normal,
    color: colors.gray.text,
  },
  buttonContainer: {
    paddingRight: layout.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const navigationOptions = {
  title: 'Channel Privacy',
  headerLeft: (<BackButton />),
}

export default class ChannelVisibilityScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)
    const {
      visibility,
      onVisibilityChange: onVisibilityChangeUpdate,
    } = props.navigation.state.params
    this.state = { visibility }
    this.onVisibilityChangeUpdate = onVisibilityChangeUpdate
  }

  onVisibilityChange(value) {
    this.setState({
      visibility: value,
    })
    this.onVisibilityChangeUpdate(value)
  }

  renderRightContent(visibility) {
    if (visibility === this.state.visibility.toLowerCase()) {
      return (
        <View style={styles.buttonContainer}>
          <Ionicons
            name="md-checkmark"
            size={24}
            color={colors[visibility]}
          />
        </View>
      )
    }
    return (<View />)
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.container}>
          <SettingsList borderColor={colors.gray.background}>
            <SettingsList.Header headerText="" />
            <SettingsList.Item
              title="Open"
              titleStyle={{ color: colors.public }}
              hasNavArrow={false}
              onPress={() => this.onVisibilityChange('public')}
              rightSideContent={this.renderRightContent('public')}
            />
            <SettingsList.Header headerText="" />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>
                Everyone can view the channel and anyone logged-in can add to it.
              </Text>
            </View>
            <SettingsList.Header headerText="" />
            <SettingsList.Item
              title="Closed"
              titleStyle={{ color: colors.closed }}
              hasNavArrow={false}
              onPress={() => this.onVisibilityChange('closed')}
              rightSideContent={this.renderRightContent('closed')}
            />
            <SettingsList.Header headerText="" />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>
                Everyone can view the channel but only you and collaborators can add to it.
              </Text>
            </View>
            <SettingsList.Header headerText="" />
            <SettingsList.Item
              title="Private"
              titleStyle={{ color: colors.private }}
              hasNavArrow={false}
              onPress={() => this.onVisibilityChange('private')}
              rightSideContent={this.renderRightContent('private')}
            />
          </SettingsList>
          <SettingsList.Header headerText="" />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              Only you and collaborators can view and add to the channel.
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

ChannelVisibilityScreen.propTypes = {
  navigation: PropTypes.any,
}

ChannelVisibilityScreen.defaultProps = {
  navigation: () => null,
}
