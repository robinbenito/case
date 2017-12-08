import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import { Section } from '../UI/Layout'
import HeaderAwareContainer from '../UI/Layout/HeaderAwareContainer'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'

import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'

export default class TextForm extends Component {
  constructor(props) {
    super(props)

    const {
      block: {
        title,
        description,
        kind: {
          content,
        },
      },
    } = props

    this.state = {
      title,
      description,
      content,
    }
  }

  componentWillReceiveProps({ block: { title, description, kind: { content } } }) {
    this.setState({ title, description, content })
  }

  componentDidUpdate() {
    const {
      block: {
        title,
        description,
        kind: {
          content,
        },
      },
    } = this.props

    injectButtonWhenDiff({
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
      <HeaderAwareContainer>
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
                rows={3}
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
                returnKeyType="next"
                clearButtonMode="while-editing"
                onSubmitEditing={() => {
                  this.DescriptionInput.focus()
                }}
              />

              <StackedTextArea
                name="description"
                placeholder="Description (optional)"
                value={description}
                ref={ref => this.DescriptionInput = ref}
                onChangeText={this.onChangeText('description')}
              />
            </Fieldset>
          </Section>
        </KeyboardAwareScrollView>
      </HeaderAwareContainer>
    )
  }
}

TextForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
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
  block: {
    title: '',
    description: '',
    kind: {
      content: '',
    },
  },
}
