// NOTE: Taken from
// https://github.com/react-community/react-navigation/issues/271#issuecomment-303217976

import { NavigationActions } from 'react-navigation'

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName, params } = action

  const latestRoute = state && state.routes[state.routes.length - 1]
  const latestId = state && latestRoute.params && latestRoute.params.id
  const possibleId = params && params.id

  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === latestRoute.routeName &&
    possibleId === latestId
  ) ? null : getStateForAction(action, state)
}

export default navigateOnce
