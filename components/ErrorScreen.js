import React from 'react'
import PropTypes from 'prop-types'
import formatErrors from '../utilities/formatErrors'
import { RelativeFill } from './UI/Layout'
import { ErrorMessage, StatusMessage, GenericMessage } from './UI/Alerts'
import { ButtonLabel, Button } from './UI/Buttons'

const ErrorScreen = ({ message, errors, showRefresh, onRefresh, ...rest }) => (
  <RelativeFill {...rest}>
    {message &&
      <StatusMessage>
        {message}
      </StatusMessage>
    }
    <GenericMessage>
      Oops! Something went wrong.
    </GenericMessage>
    <ErrorMessage>
      {formatErrors(errors)}
    </ErrorMessage>
    {showRefresh && <Button space={1} onPress={onRefresh}>
      <ButtonLabel>Refresh</ButtonLabel>
    </Button>}
  </RelativeFill>
)

ErrorScreen.propTypes = {
  message: PropTypes.node,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  showRefresh: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
}

ErrorScreen.defaultProps = {
  message: null,
}

export default ErrorScreen
