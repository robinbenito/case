import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FieldSet from '../FieldSet'
import HeaderRightButton from '../HeaderRightButton'

import { Units, Border } from '../../constants/Style'

const contentWidth = Units.window.width - Units.base

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`

const Field = styled(FieldSet)`
  margin-top: ${Units.scale[4]};
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

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: props.block.image,
      title: props.block.title,
      description: props.block.description,
    }
  }

  componentDidUpdate() {
    this.setNavOptions({
      headerRight: <HeaderRightButton onPress={this.onSubmit} text={this.props.submitText} />,
    })
  }

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state)
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, this.props.navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  render() {
    const { image, title, description } = this.state
    return (
      <Container>
        <ImagePreview source={{ uri: image }} />
        <Field
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
      </Container>
    )
  }
}

ImageForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  navigation: PropTypes.any,
  navigationOptions: PropTypes.any.isRequired,
  block: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
}

ImageForm.defaultProps = {
  onSubmit: () => null,
  navigation: () => null,
  submitText: 'Done',
  block: {
    image: '',
    title: '',
    description: '',
  },
}
