import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import { Container, Section } from '../UI/Layout'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'

import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'

export default class TextForm extends Component {
  static isAbleToListen = false

  constructor(props) {
    super(props)

    const { block: { title, description, kind: { content } } } = this.props

    this.state = {
      title,
      description,
      content,
    }
  }

  componentWillReceiveProps({ block: { title, description, kind: { content } } }) {
    this.setState({ title, description, content })

    this.isAbleToListen = true
  }

  componentDidUpdate() {
    if (!this.isAbleToListen) return

    const { block: { title, description, kind: { content } } } = this.props

    injectButtonWhenDiff({
      navigation: this.props.navigation,
      state: this.state,
      fields: { title, description, content },
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text={this.props.submitText}
      />,
    })
  }

  onChangeText = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state)
  }

  render() {
    const { title, description, content } = this.state

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section space={4}>
            <FieldsetLabel>
              Text
            </FieldsetLabel>

            <Fieldset>
              <StackedTextArea
                name="content"
                placeholder="Text"
                value={content}
                rows={4}
                onChangeText={this.onChangeText('content')}
                autoFocus
              />
            </Fieldset>
          </Section>

          <Section>
            <FieldsetLabel>
              Title / Description
            </FieldsetLabel>

            <Fieldset>
              <StackedInput
                placeholder="Title (optional)"
                onChangeText={this.onChangeText('title')}
                value={title}
              />

              <StackedTextArea
                name="description"
                placeholder="Description (optional)"
                value={description}
                onChangeText={this.onChangeText('description')}
              />
            </Fieldset>
          </Section>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

TextForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    kind: PropTypes.shape({
      content: PropTypes.string,
    }),
  }),
}

TextForm.defaultProps = {
  onSubmit: () => {},
  submitText: 'Done',
  navigation: {},
  block: {
    title: '',
    description: '',
    kind: {
      content: '',
    },
  },
}
