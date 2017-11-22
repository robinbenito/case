// NOTE: Adapted from https://github.com/react-community/react-navigation/issues/1439

import { last, has, isArray } from 'lodash'
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

const getCurrentRoute = (route) => {
  if (!_container || !_container.state.nav) return null

  if (!route) {
    const stack = _container.state.nav.routes[_container.state.nav.index] || null
    const currentRoute = stack.routes[stack.index]

    if (has(currentRoute, 'routes')) return getCurrentRoute(currentRoute.routes)

    return currentRoute
  }

  if (has(route, 'routes')) return getCurrentRoute(route.routes)
  if (isArray(route)) return getCurrentRoute(last(route))

  return route
}

const getCurrentParams = () =>
  (getCurrentRoute() || {}).params

const getCurrentRouteName = () =>
  (getCurrentRoute() || {}).routeName

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
