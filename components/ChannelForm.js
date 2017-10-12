import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SettingsList from 'react-native-settings-list'

import FieldSet from './FieldSet'
import HeaderRightButton from './HeaderRightButton'

import NavigatorService from '../utilities/navigationService'
import { Units, Colors, Border } from '../constants/Style'

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`

const Field = styled(FieldSet)`
  margin-top: ${Units.scale[4]};
`

class ChannelForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.channel.title,
      description: props.channel.description,
      visibility: props.channel.visibility,
    }
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

  onSubmit = () => {
    this.props.onSubmit(this.state)
  }

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  onVisibilityChange = (value) => {
    this.setState({ visibility: value.toUpperCase() })
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, this.props.navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  goToChannelVisibilityScreen = () => {
    const { visibility } = this.state

    NavigatorService.navigate('channelVisibility', {
      visibility,
      onVisibilityChange: this.onVisibilityChange,
    })
  }

  render() {
    const { visibility } = this.state
    const { channel } = this.props
    return (
      <KeyboardAwareScrollView>
        <Container>
          <Field
            isFirst
            label="Title / Description"
            onChange={this.onFieldChange}
            fields={[
              {
                key: 'title',
                placeholder: 'Title',
                value: channel.title,
              },
              {
                key: 'description',
                placeholder: 'Description',
                value: channel.description,
                type: 'textarea',
              },
            ]}
          />
          <SettingsList borderColor={Border.borderColor}>
            <SettingsList.Header headerText="" />
            <SettingsList.Item
              title="Privacy"
              titleInfo={visibility.charAt(0).toUpperCase() + visibility.substr(1).toLowerCase()}
              titleInfoStyle={{ color: Colors.channel[visibility.toLowerCase()] }}
              onPress={this.goToChannelVisibilityScreen}
            />
          </SettingsList>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}

ChannelForm.propTypes = {
  onSubmit: PropTypes.func,
  navigation: PropTypes.any,
  navigationOptions: PropTypes.any.isRequired,
  channel: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    visibility: PropTypes.string,
  }),
}

ChannelForm.defaultProps = {
  onSubmit: () => null,
  navigation: {},
  channel: {
    title: '',
    description: '',
    visibility: 'CLOSED',
  },
}


export default ChannelForm
