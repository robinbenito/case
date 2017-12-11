import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RelativeFill } from './UI/Layout'
import { ErrorMessage, StatusMessage, GenericMessage } from './UI/Alerts'
import { ButtonLabel, Button } from './UI/Buttons'

import formatErrors from '../utilities/formatErrors'

export default class ErrorScreen extends Component {
  static propTypes = {
    message: PropTypes.node,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRefresh: PropTypes.func,
  }

  static defaultProps = {
    message: null,
    onRefresh: null,
  }

  render() {
    const { message, errors, onRefresh, ...rest } = this.props

    return (
      <RelativeFill {...rest}>
        <GenericMessage>
          Oops! Something went wrong.
        </GenericMessage>

        {message &&
          <StatusMessage>
            {message}
          </StatusMessage>
        }

        <ErrorMessage>
          {formatErrors(errors)}
        </ErrorMessage>

        {onRefresh &&
          <Button space={1} onPress={onRefresh}>
            <ButtonLabel>Refresh</ButtonLabel>
          </Button>
        }
      </RelativeFill>
    )
  }
}
