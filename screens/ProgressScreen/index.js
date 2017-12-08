import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StatusBarAwareContainer from '../../components/UI/Layout/StatusBarAwareContainer'
import SimulatedProgressHeader from '../../components/SimulatedProgressHeader'
import LoadingScreen from '../../components/LoadingScreen'

import wait from '../../utilities/wait'
import alertErrors from '../../utilities/alertErrors'
import navigationService from '../../utilities/navigationService'

export default class ProgressScreen extends Component {
  static propTypes = {
    promise: PropTypes.shape({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
    }).isRequired,
    done: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
  }

  static defaultProps = {
    delay: 500,
  }

  constructor(props) {
    super(props)

    props.promise
      .then(() => wait(props.delay))
      .then(props.done)
      .catch((err) => {
        navigationService.back()
        alertErrors(err)
      })
  }

  render() {
    const { label } = this.props

    return (
      <StatusBarAwareContainer>
        <SimulatedProgressHeader>
          {label}...
        </SimulatedProgressHeader>

        <LoadingScreen />
      </StatusBarAwareContainer>
    )
  }
}
