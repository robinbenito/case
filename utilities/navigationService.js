// NOTE: Adapted from https://github.com/react-community/react-navigation/issues/1439

import { has } from 'lodash'
import { StackActions, NavigationActions } from 'react-navigation'

let _container

const setContainer = (container) => {
  _container = container
}

const getContainer = () => _container

const reset = (routeName, params = {}) => {
  _container.dispatch(
    StackActions.reset({
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

const getCurrentIndex = (state = null) => {
  if (!_container) return 0

  if (state) return state.index

  return _container.state.nav.index
}

const getPreviousRoute = () =>
  _container.state.nav.routes[_container.state.nav.index - 1]

const back = (key) => {
  _container.dispatch(
    NavigationActions.back(key),
  )
}

const navigate = (routeName, params = {}) => {
  _container.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  )
}

const isStateCurrentState = state =>
  _container.state.nav.index === _container.state.nav.routes.indexOf(state)

export default {
  setContainer,
  getContainer,
  navigate,
  reset,
  back,
  getCurrentRoute,
  getCurrentParams,
  getCurrentRouteName,
  getCurrentIndex,
  getPreviousRoute,
  isStateCurrentState,
}
