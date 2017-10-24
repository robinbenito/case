import { reduce } from 'lodash'

import {
  SET_CURRENT_ROUTE,
  SET_HEADER_TITLE_VISIBILITY,
  TOGGLE_ADD_MENU,
  SEND_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  DISMISS_ROUTE_ALERTS,
 } from './actions'

const INITIAL_STATES = {
  routes: {
    current: null,
  },

  ui: {
    isHeaderTitleVisible: true,
    isAddMenuActive: false,
  },

  info: {
    alerts: {},
    dismissedAlertIds: [],
  },
}

export const routes = (state = INITIAL_STATES.routes, { type, current }) => {
  switch (type) {
    case SET_CURRENT_ROUTE:
      return { ...state, current }

    default:
      return state
  }
}

export const ui = (state = INITIAL_STATES.ui, { type, isHeaderTitleVisible }) => {
  switch (type) {
    case SET_HEADER_TITLE_VISIBILITY:
      return { ...state, isHeaderTitleVisible }

    case TOGGLE_ADD_MENU:
      return { ...state, isAddMenuActive: !state.isAddMenuActive }

    default:
      return state
  }
}

export const info = (state = INITIAL_STATES.info, action) => {
  switch (action.type) {
    case SEND_ALERT: {
      if (state.dismissedAlertIds.includes(action.alert.id)) {
        return { ...state }
      }

      return {
        ...state,
        alerts: { ...state.alerts, [action.alert.id]: action.alert },
      }
    }

    case DISMISS_ALERT: {
      const { [action.id]: deleted, ...remainingAlerts } = state.alerts
      return {
        ...state,
        alerts: remainingAlerts,
        dismissedAlertIds: [
          action.id,
          ...state.dismissedAlertIds,
        ],
      }
    }

    // NOTE: Intentionally does not add to `dismissedAlertIds`
    case DISMISS_ALL_ALERTS:
      return { ...state, alerts: INITIAL_STATES.info.alerts }

    // NOTE: Intentionally does not add to `dismissedAlertIds`
    /* eslint-disable no-param-reassign */
    case DISMISS_ROUTE_ALERTS: {
      const remainingAlerts = reduce(state.alerts, (memo, alert, key) => {
        if (alert.route === action.route) {
          memo[key] = alert
          return memo
        }

        return memo
      }, {})

      return { ...state, alerts: remainingAlerts }
    }
    /* eslint-enable no-param-reassign */

    default:
      return state
  }
}
