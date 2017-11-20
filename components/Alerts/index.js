import { defer } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import Store from '../../state/Store'
import {
  SEND_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  DISMISS_ROUTE_ALERTS,
} from '../../state/actions'

import Alert from './Alert'

export const sendAlert = ({ id, ...rest }) => {
  // Deferred so as to be sent with the correct route
  defer(() => {
    const { routes: { currentRoute } } = Store.getState()
    const alertId = id || `${new Date().getTime()}`

    Store.dispatch({
      type: SEND_ALERT,
      alert: {
        id: alertId,
        route: currentRoute,
        ...rest,
      },
    })
  })
}

export const dismissAlert = id =>
  Store.dispatch({ id, type: DISMISS_ALERT })

export const dismissAllAlerts = () =>
  Store.dispatch({ type: DISMISS_ALL_ALERTS })

export const dismissAlertsOnCurrentRoute = () => {
  const { routes: { currentRoute } } = Store.getState()
  Store.dispatch({ type: DISMISS_ROUTE_ALERTS, route: currentRoute })
}

const Container = styled.View`
  width: 100%;
  position: absolute;
  top: 0;
`

class Alerts extends Component {
  static propTypes = {
    alerts: PropTypes.object,
  }

  static defaultProps = {
    alerts: {},
  }

  render() {
    const { alerts, ...rest } = this.props

    if (alerts.length === 0) return <View />

    return (
      <Container {...rest}>
        {Object.keys(alerts).map((id) => {
          const props = alerts[id]
          return <Alert key={id} {...props} />
        })}
      </Container>
    )
  }
}

const mapStatetoProps = ({ info: { alerts } }) => ({ alerts })
const AlertsWithState = connect(mapStatetoProps)(Alerts)

export default AlertsWithState
