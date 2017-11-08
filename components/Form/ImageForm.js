import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HeaderRightButton from '../HeaderRightButton'
import { Container, Section } from '../UI/Layout'
import { FieldsetLabel, Fieldset, StackedInput, StackedTextArea } from '../UI/Inputs'
import { BLOCK_SIZES } from '../BlockItem'

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

  componentDidUpdate() {
    const {
      block: {
        title,
        description,
        kind: {
          image_url: image,
        },
      },
    } = this.props

    injectButtonWhenDiff({
      navigation: this.props.navigation,
      state: this.state,
      fields: { title, description, image },
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
      <Container>
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
      </Container>
    )
  }
}

ImageForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  navigation: PropTypes.object,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    kind: PropTypes.shape({
      image_url: PropTypes.string,
    }),
  }),
}

ImageForm.defaultProps = {
  onSubmit: () => null,
  navigation: {},
  submitText: 'Done',
  block: {
    title: '',
    description: '',
    kind: {
      image_url: '',
    },
  },
}
