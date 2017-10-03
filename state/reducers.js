import { SET_CURRENT_ROUTE, SET_HEADER_TITLE_VISIBILITY, TOGGLE_ADD_MENU } from './actions'

const STATES = {
  routes: {
    current: null,
  },
  ui: {
    isHeaderTitleVisible: true,
    isAddMenuActive: false,
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
    case TOGGLE_ADD_MENU:
      return { ...state, isAddMenuActive: !state.isAddMenuActive }
    default:
      return state
  }
}
