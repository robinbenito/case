import React from 'react'
import PropTypes from 'prop-types'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import FieldSet from '../../../components/FieldSet'
import BottomButton from '../../../components/BottomButton'

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

export default class AddTextScreen extends React.Component {
  static navigationOptions() {
    return {
      title: 'New Text',
    }
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

  render() {
    const bottomButton = this.state.content ? (
      <BottomButton
        text="Connect"
        onPress={this.onSubmit}
      />
    ) : null

    return (
      <KeyboardAvoidingView style={styles.container}>
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
          {bottomButton}
        </View>
      </KeyboardAvoidingView>
    )
  }
}

AddTextScreen.propTypes = {
  navigation: PropTypes.any,
}

AddTextScreen.defaultProps = {
  navigation: () => null,
}
