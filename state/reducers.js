import { SET_CURRENT_ROUTE, SET_HEADER_TITLE_VISIBILITY } from './actions'

const STATES = {
  routes: {
    current: null,
  },
  ui: {
    isHeaderTitleVisible: true,
  },
}

export const routes = (state = STATES.routes, { type, current }) => {
  switch (type) {
    case SET_CURRENT_ROUTE:
      return { ...state, current }
    default:
      return state
  }
}

export const ui = (state = STATES.ui, { type, isHeaderTitleVisible }) => {
  switch (type) {
    case SET_HEADER_TITLE_VISIBILITY:
      return { ...state, isHeaderTitleVisible }
    default:
      return state
  }
}
