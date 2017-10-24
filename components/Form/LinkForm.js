import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { isURL } from 'validator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FieldSet from '../FieldSet'
import HeaderRightButton from '../HeaderRightButton'
import { Container } from '../../components/UI/Layout'

import { Units } from '../../constants/Style'

const Field = styled(FieldSet)`
  margin-top: ${Units.scale[4]};
`

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      source_url: props.block.source.url,
      title: props.block.title,
      description: props.block.description,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.block) {
      this.setState({ source_url: nextProps.block.source.url })
    }
  }

  componentDidUpdate() {
    // Hide or show the done button depending on if content is present
    if (this.state.source_url && isURL(this.state.source_url)) {
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
    const { source_url, title, description } = this.state
    const hasProcessed = (title || description)
    return (
      <Container>
        <KeyboardAwareScrollView>
          <Field
            isFirst
            label="Link"
            onChange={this.onFieldChange}
            fields={[
              {
                key: 'source_url',
                placeholder: 'URL',
                type: 'url',
                value: source_url,
                editable: !hasProcessed,
              },
            ]}
          />
          {hasProcessed && <Field
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
                type: 'textarea',
              },
            ]}
          />}
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

LinkForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  navigation: PropTypes.any,
  navigationOptions: PropTypes.any.isRequired,
  block: PropTypes.shape({
    title: PropTypes.any,
    description: PropTypes.any,
    source: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}

LinkForm.defaultProps = {
  onSubmit: () => null,
  navigation: () => null,
  submitText: 'Done',
  block: {
    title: null,
    description: null,
    source: {
      url: '',
    },
  },
}
