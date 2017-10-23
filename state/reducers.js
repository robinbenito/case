import {
  SET_CURRENT_ROUTE,
  SET_HEADER_TITLE_VISIBILITY,
  TOGGLE_ADD_MENU,
  SEND_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
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

export const info = (state = INITIAL_STATES.info, { type, alert, id }) => {
  switch (type) {
    case SEND_ALERT: {
      return {
        ...state,
        alerts: { ...state.alerts, [alert.id]: alert },
      }
    }

    case DISMISS_ALERT: {
      const { [id]: deleted, ...rest } = state.alerts
      return { ...state, alerts: rest }
    }

    case DISMISS_ALL_ALERTS:
      return { ...state, alerts: INITIAL_STATES.info.alerts }

    default:
      return state
  }
}
