import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isURL } from 'validator'

import FieldSet from '../FieldSet'
import HeaderRightButton from '../HeaderRightButton'

import { Units } from '../../constants/Style'

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`

const Field = styled(FieldSet)`
  margin-top: ${Units.scale[4]};
`

export default class TextForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.block.title,
      description: props.block.description,
      content: props.block.content,
    }
  }

  componentDidUpdate() {
    // Hide or show the done button depending on if content is present
    if (this.state.content) {
      this.setNavOptions({
        headerRight: (
          <HeaderRightButton onPress={this.onSubmit} text={this.props.submitText} />
        ),
      })
    } else {
      this.setNavOptions({
        headerRight: null,
      })
    }
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
    return (
      <Container>
        <FieldSet
          label="Text"
          onChange={this.onFieldChange}
          fields={[
            {
              key: 'content',
              placeholder: 'Text',
              type: 'textarea',
              value: this.state.content,
            },
          ]}
        />
        <Field
          label="Title / Description"
          onChange={this.onFieldChange}
          fields={[
            {
              key: 'title',
              placeholder: 'Title',
              value: this.state.title,
            },
            {
              key: 'description',
              placeholder: 'Description',
              value: this.state.description,
            },
          ]}
        />
      </Container>
    )
  }
}

TextForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  navigation: PropTypes.any,
  navigationOptions: PropTypes.any.isRequired,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
  }),
}

TextForm.defaultProps = {
  onSubmit: () => null,
  navigation: () => null,
  submitText: 'Done',
  block: {
    title: '',
    description: '',
    content: '',
  },
}
