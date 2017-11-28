import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isURL } from 'validator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import { Container, Section } from '../UI/Layout'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'
import { sendAlert, dismissAllAlerts } from '../Alerts'

import { updateHeader } from '../SubmittableHeader'

export default class LinkForm extends Component {
  constructor(props) {
    super(props)

    const {
      block: {
        title,
        description,
        source: {
          url: source_url,
        },
      },
    } = this.props

    this.state = {
      source_url,
      title,
      description,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.block && nextProps.block.source && nextProps.block.source.url) {
      this.setState({ source_url: nextProps.block.source.url })
    }
  }

  componentDidUpdate() {
    // TODO: Refactor injectButtonWhenDiff to optionally take a validation rule
    // instead of simply comparing the difference of two states.
    // (i.e. is string a URL?)
    if (this.state.source_url && isURL(this.state.source_url)) {
      updateHeader({
        headerRight: (
          <HeaderRightButton
            onPress={this.onSubmit}
            text={this.props.submitText}
          />
        ),
      })
    } else {
      updateHeader({
        headerRight: null,
      })
    }
  }

  onChangeText = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  onSubmit = () => {
    dismissAllAlerts()

    const { source_url } = this.state

    if (!isURL(source_url)) {
      sendAlert({
        children: 'Please enter a valid URL',
      })

      // Wait a moment before re-focusing the input.
      // Calling `focus` immediately doesn't work
      // and it feels a bit better to wait anyway.
      setTimeout(() => this.Input.focus(), 500)

      return
    }

    this.props.onSubmit(this.state)
  }

  render() {
    const { block: { state } } = this.props
    const { source_url, title, description } = this.state

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section space={4}>
            <FieldsetLabel>
              URL
            </FieldsetLabel>

            <Fieldset>
              <StackedInput
                placeholder="https://"
                onChangeText={this.onChangeText('source_url')}
                value={source_url}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                returnKeyType={state !== 'pending' ? 'next' : 'done'}
                onSubmitEditing={this.onSubmit}
                editable={state === 'pending'}
                ref={ref => this.Input = ref}
              />
            </Fieldset>
          </Section>

          {state !== 'pending' &&
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
                />

                <StackedTextArea
                  name="description"
                  placeholder="Description (optional)"
                  value={description}
                  onChangeText={this.onChangeText('description')}
                  rows={5}
                />
              </Fieldset>
            </Section>
          }
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

LinkForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.shape({
      url: '',
    }),
  }),
}

LinkForm.defaultProps = {
  onSubmit: () => null,
  submitText: 'Done',
  block: {
    title: '',
    description: '',
    source_url: '',
    state: 'pending',
  },
}
