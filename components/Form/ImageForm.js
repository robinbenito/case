import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import { Section } from '../UI/Layout'
import HeaderAwareContainer from '../UI/Layout/HeaderAwareContainer'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'
import { BLOCK_SIZES } from '../BlockItem'

import { updateHeader } from '../SubmittableHeader'

import injectButtonWhenDiff from '../../utilities/injectButtonWhenDiff'

import { Units, Border } from '../../constants/Style'

const ImagePreview = styled.Image`
  width: ${BLOCK_SIZES['1-up']};
  height: ${BLOCK_SIZES['1-up']};
  border-width: 1;
  border-color: ${Border.borderColor};
  align-self: center;
  resize-mode: contain;
  margin-vertical: ${Units.scale[3]};
`

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props)

    const {
      block: {
        title,
        description,
        kind: {
          image_url: image,
        },
      },
    } = props

    this.state = {
      image,
      title,
      description,
    }
  }

  componentDidMount() {
    const { block: { state } } = this.props

    if (state !== 'pending') return

    updateHeader({
      headerRight: <HeaderRightButton
        onPress={this.onSubmit}
        text={this.props.submitText}
      />,
    })
  }

  componentDidUpdate() {
    const {
      block: {
        title,
        state,
        description,
      },
    } = this.props

    if (state === 'pending') return

    injectButtonWhenDiff({
      state: this.state,
      fields: { title, description },
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
    const { image, title, description } = this.state

    return (
      <HeaderAwareContainer>
        <KeyboardAwareScrollView>
          <ImagePreview source={{ uri: image }} />

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
                autoFocus
              />

              <StackedTextArea
                name="description"
                placeholder="Description (optional)"
                value={description}
                onChangeText={this.onChangeText('description')}
                rows={2}
              />
            </Fieldset>
          </Section>
        </KeyboardAwareScrollView>
      </HeaderAwareContainer>
    )
  }
}

ImageForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    kind: PropTypes.shape({
      image_url: PropTypes.string,
    }),
  }),
}

ImageForm.defaultProps = {
  onSubmit: () => null,
  submitText: 'Done',
  block: {
    title: '',
    description: '',
    state: 'pending',
    kind: {
      image_url: '',
    },
  },
}
