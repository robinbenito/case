import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FieldSet from '../../../components/FieldSet'
import HeaderRightButton from '../../../components/HeaderRightButton'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'

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
  headerLeft: null,
}

export default class NewChannelScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      visibility: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit() {
    console.log(this.state)
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  render() {
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
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

NewChannelScreen.propTypes = {
  navigation: PropTypes.any,
}

NewChannelScreen.defaultProps = {
  navigation: () => null,
}
