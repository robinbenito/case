import React from 'react'
import PropTypes from 'prop-types'
import formatErrors from '../utilities/formatErrors'
import { CenteringPane } from './UI/Layout'
import { ErrorMessage, StatusMessage } from './UI/Alerts'

const ErrorScreen = ({ message, error, ...rest }) => (
  <CenteringPane {...rest}>
    {message &&
      <StatusMessage>
        {message}
      </StatusMessage>
    }

    <ErrorMessage>
      {formatErrors(error)}
    </ErrorMessage>
  </CenteringPane>
)

ErrorScreen.propTypes = {
  message: PropTypes.node,
  error: PropTypes.object.isRequired,
}

ErrorScreen.defaultProps = {
  message: null,
}

export default ErrorScreen
