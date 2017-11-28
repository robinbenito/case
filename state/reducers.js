import { reduce } from 'lodash'

import {
  SET_CURRENT_ROUTE,
  SET_CURRENT_ABILITY,
  SET_HEADER_TITLE_VISIBILITY,
  CLOSE_ADD_MENU,
  TOGGLE_ADD_MENU,
  SET_HEADER_MENU_VISIBILITY,
  SEND_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  DISMISS_ROUTE_ALERTS,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_HEADER,
 } from './actions'

const INITIAL_STATES = {
  routes: {
    currentRoute: {
      routeName: null,
    },
  },

  ability: {},

  ui: {
    isHeaderTitleVisible: true,
    isAddMenuActive: false,
    isHeaderMenuActive: false,
    modal: {},
    header: {},
  },

  info: {
    alerts: {},
    dismissedAlertIds: [],
  },
}

export const routes = (state = INITIAL_STATES.routes, action) => {
  switch (action.type) {
    case SET_CURRENT_ROUTE:
      return { ...state, currentRoute: action.currentRoute }
    default:
      return state
  }
}

export const ability = (state = INITIAL_STATES.ability, action) => {
  switch (action.type) {
    case SET_CURRENT_ABILITY:
      return { ...action.can }
    default:
      return state
  }
}

export const ui = (state = INITIAL_STATES.ui, action) => {
  switch (action.type) {
    case SET_HEADER_TITLE_VISIBILITY:
      return { ...state, isHeaderTitleVisible: action.isHeaderTitleVisible }

    case TOGGLE_ADD_MENU:
      return { ...state, isAddMenuActive: !state.isAddMenuActive }

    case CLOSE_ADD_MENU:
      return { ...state, isAddMenuActive: false }

    case SET_HEADER_MENU_VISIBILITY:
      return { ...state, isHeaderMenuActive: action.isHeaderMenuActive }

    case OPEN_MODAL:
      return { ...state, modal: { ...action.modal, active: true } }

    case CLOSE_MODAL:
      return { ...state, modal: { active: false } }

    case UPDATE_HEADER:
      return { ...state, header: { ...action.header } }

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
