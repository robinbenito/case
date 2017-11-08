import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isURL } from 'validator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import { Container, Section } from '../UI/Layout'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'
import { sendAlert, dismissAllAlerts } from '../Alerts'

import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'

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

  componentDidUpdate() {
    const {
      block: {
        title,
        description,
        source: {
          url: source_url,
        },
      },
    } = this.props

    injectButtonWhenDiff({
      navigation: this.props.navigation,
      state: this.state,
      fields: { title, description, source_url },
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
    dismissAllAlerts()

    const { source_url } = this.state

    if (!isURL(source_url)) {
      return sendAlert({
        children: 'Please enter a valid URL',
      })
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
              />
            </Fieldset>
          </Section>

          {state !== 'pending' &&
            <Section fill>
              <FieldsetLabel>
                Title / Description
              </FieldsetLabel>

              <Fieldset>
                <StackedInput
                  placeholder="Title (optional)"
                  onChangeText={this.onChangeText('title')}
                  value={title}
                  returnKeyType="next"
                />

                <StackedTextArea
                  name="description"
                  placeholder="Description (optional)"
                  value={description}
                  onChangeText={this.onChangeText('description')}
                  returnKeyType="done"
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
  navigation: PropTypes.object,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    source_url: PropTypes.string,
  }),
}

LinkForm.defaultProps = {
  onSubmit: () => null,
  navigation: {},
  submitText: 'Done',
  block: {
    title: '',
    description: '',
    source_url: '',
    state: 'pending',
  },
}
