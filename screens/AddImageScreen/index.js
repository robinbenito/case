import React from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import FieldSet from '../../components/FieldSet'
import BackButton from '../../components/BackButton'
import HeaderRightButton from '../../components/HeaderRightButton'

import { Units, Border } from '../../constants/Style'

const { width } = Dimensions.get('window')
const contentWidth = width - Units.base

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`

const ImagePreview = styled.Image`
  width: ${contentWidth};
  height: ${contentWidth};
  border-width: 1;
  border-color: ${Border.borderColor};
  align-self: center;
  resize-mode: contain;
  margin-vertical: ${Units.scale[3]};
`

const navigationOptions = {
  title: 'New Image',
  headerLeft: (<BackButton />),
}

export default class AddImageScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)

    const { image } = props.navigation.state.params
    this.state = {
      image,
      title: image.split('/').pop(),
      description: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setNavOptions({
      headerRight: <HeaderRightButton onPress={this.onSubmit} text="Done" />,
    })
  }

  onFieldChange(key, value) {
    this.setState({
      [key]: value,
    })
  }

  onSubmit() {
    const { image, title, description } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { image, title, description },
    })

    this.props.navigation.dispatch(navigateAction)
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  render() {
    const { image, title, description } = this.state
    return (
      <Container>
        <ImagePreview source={{ uri: image }} />
        <FieldSet
          isFirst
          label="Title / Description"
          onChange={this.onFieldChange}
          fields={[
            {
              key: 'title',
              placeholder: 'Title',
              value: title,
            },
            {
              key: 'description',
              placeholder: 'Description',
              value: description,
            },
          ]}
        />
      </Container >
    )
  }
}

AddImageScreen.propTypes = {
  navigation: PropTypes.any,
}

AddImageScreen.defaultProps = {
  navigation: () => null,
}
