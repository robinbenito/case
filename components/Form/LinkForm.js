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

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      source_url: props.block.source_url,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.block) {
      this.setState({ source_url: nextProps.block.source_url })
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
    return (
      <Container>
        <Field
          isFirst
          label="Link"
          onChange={this.onFieldChange}
          fields={[
            {
              key: 'source_url',
              placeholder: 'URL',
              type: 'url',
              value: this.state.source_url,
            },
          ]}
        />
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
    source_url: PropTypes.string,
  }),
}

LinkForm.defaultProps = {
  onSubmit: () => null,
  navigation: () => null,
  submitText: 'Done',
  block: {
    source_url: '',
  },
}
