import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FieldSet from '../../components/FieldSet'
import BackButton from '../../components/BackButton'
import HeaderRightButton from '../../components/HeaderRightButton'

import layout from '../../constants/Layout'
import colors from '../../constants/Colors'

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
  title: 'New Text',
  headerLeft: (<BackButton />),
}

export default class AddTextScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      content: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidUpdate() {
    // Hide or show the done button depending on if content is present
    if (this.state.content) {
      this.setNavOptions({
        headerRight: (
          <HeaderRightButton onPress={this.onSubmit} text="Done" />
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
    const { title, description, content } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { title, description, content },
    })

    this.props.navigation.dispatch(navigateAction)
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
            style={styles.fieldset}
            label="Text"
            onChange={this.onFieldChange}
            fields={[
              {
                key: 'content',
                placeholder: 'Text',
                type: 'textarea',
              },
            ]}
          />
          <FieldSet
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

AddTextScreen.propTypes = {
  navigation: PropTypes.any,
}

AddTextScreen.defaultProps = {
  navigation: () => null,
}
