import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import ActionSheet from 'react-native-actionsheet'

import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.padding,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: (layout.padding * 4),
    alignItems: 'center',
  },
})

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = ['Cancel', 'Upload photo', 'Take photo']

class AddScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      text: null,
      selectedAction: null,
      isOpen: false,
    }
    this.handlePress = this.handlePress.bind(this)
  }

  // show action sheet on first render
  componentDidMount() {
    this.ActionSheet.show()
  }

  // Trigger a render when props.isFocus changes
  componentWillReceiveProps() {
    this.setState({
      isOpen: !this.props.isFocused,
    })
  }

  goBack() {
    this.props.navigation.navigate('home')
  }

  navigateToConnect() {
    const { text, image } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { text, image },
    })

    this.props.navigation.dispatch(navigateAction)
  }

  handlePress(i) {
    switch (options[i]) {
      case 'Upload photo':
        this.showPhotos()
        break
      case 'Take photo':
        this.showCamera()
        break
      case 'Cancel':
        this.goBack()
        break
      default:
        console.log('unhandled event')
    }
  }

  async showCamera() {
    const result = await ImagePicker.launchCameraAsync({})
    if (!result.cancelled) {
      this.setState({ image: result.uri })
      this.navigateToConnect()
    }
  }

  async showPhotos() {
    const result = await ImagePicker.launchImageLibraryAsync({})
    if (!result.cancelled) {
      this.setState({ image: result.uri })
      this.navigateToConnect()
    }
  }

  render() {
    // If the state is open and we already have an action sheet,
    // go ahead and open it
    if (this.state.isOpen && this.ActionSheet) {
      this.ActionSheet.show()
    }

    return (
      <ActionSheet
        ref={o => this.ActionSheet = o}
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={this.handlePress}
      />
    )
  }
}

AddScreen.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
}

export default withNavigationFocus(AddScreen, 'add')
