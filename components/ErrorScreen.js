import React from 'react'
import PropTypes from 'prop-types'
import formatErrors from '../utilities/formatErrors'
import { RelativeFill } from './UI/Layout'
import { ErrorMessage, StatusMessage } from './UI/Alerts'

const ErrorScreen = ({ message, errors, ...rest }) => (
  <RelativeFill {...rest}>
    {message &&
      <StatusMessage>
        {message}
      </StatusMessage>
    }

    <ErrorMessage>
      {formatErrors(errors)}
    </ErrorMessage>
  </RelativeFill>
)

ErrorScreen.propTypes = {
  message: PropTypes.node,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
}

ErrorScreen.defaultProps = {
  message: null,
}

export default ErrorScreen
