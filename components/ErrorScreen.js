import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RelativeFill } from './UI/Layout'
import { ErrorMessage, StatusMessage, GenericMessage } from './UI/Alerts'
import LargeButton from './UI/Buttons/LargeButton'

import formatErrors from '../utilities/formatErrors'
import { trackErrors } from '../utilities/analytics'

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

    trackErrors(errors)

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
          <LargeButton space={1} onPress={onRefresh}>
            Refresh
          </LargeButton>
        }
      </RelativeFill>
    )
  }
}
