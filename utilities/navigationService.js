// NOTE: Adapted from https://github.com/react-community/react-navigation/issues/1439

import { has } from 'lodash'
import { NavigationActions } from 'react-navigation'

let _container

const setContainer = (container) => {
  _container = container
}

const reset = (routeName, params = {}) => {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    }),
  )
}

const getCurrentRoute = (state) => {
  if (!state) {
    if (!_container || !_container.state.nav) return null
    return getCurrentRoute(_container.state.nav.routes[_container.state.nav.index])
  }

  if (has(state, 'routes') && has(state, 'index')) {
    return getCurrentRoute(state.routes[state.index])
  }

  return state
}

const getCurrentParams = (state = null) =>
  (getCurrentRoute(state) || {}).params

const getCurrentRouteName = (state = null) =>
  (getCurrentRoute(state) || {}).routeName

const back = (key) => {
  _container.dispatch(
    NavigationActions.back(key),
  )
}

const navigate = (routeName, params = {}) => {
  _container.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

export default {
  setContainer,
  navigate,
  reset,
  back,
  getCurrentRoute,
  getCurrentParams,
  getCurrentRouteName,
}
