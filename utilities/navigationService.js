import { NavigationActions } from 'react-navigation'

let _container; // eslint-disable-line

function setContainer(container) {
  _container = container
}

function reset(routeName, params) {
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

function back(key) {
  _container.dispatch(
    NavigationActions.back(key),
  )
}

function navigate(routeName, params) {
  _container.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

function navigateDeep(actions) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  )
}

function getCurrentRoute() {
  if (!_container || !_container.state.nav) {
    return null
  }
  const firstStack = _container.state.nav.routes[_container.state.nav.index] || null
  if (firstStack) {
    return firstStack.routes[firstStack.index]
  }
  return null
}

function navigateToProfile(id) {
  return navigate('profile', { id })
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  back,
  getCurrentRoute,
  navigateToProfile,
}
